const agendamentoModel = require("../models/agendamentoModel");
const horarioTrabalhoModel = require("../models/horarioTrabalhoModel");
const horarioBloqueadoModel = require("../models/horarioBloqueadoModel");

class agendamentoService {
    static async getAllAgendamentos() {
        return await agendamentoModel.findAll();
    }

    static async getAgendamentosByUsuario(usuarioId) {
        return await agendamentoModel.findByUsuario(usuarioId);
    }

    static async getAgendamentosByProfissional(profissionalId) {
        return await agendamentoModel.findByProfissional(profissionalId);
    }

    static async getAgendamentosByUsuarioAndStatus(usuarioId, statusId) {
        return await agendamentoModel.findByUsuarioAndStatus(usuarioId, statusId);
    }

    static async getAgendamentosByProfissionalAndStatus(profissionalId, statusId) {
        return await agendamentoModel.findByProfissionalAndStatus(profissionalId, statusId);
    }

    static async getAgendamentosByStatus(statusId) {
        return await agendamentoModel.findByStatus(statusId);
    }

    static async createAgendamento(agendamento) {
        const { usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim } = agendamento;

        if (!usuario_id || !profissional_id || !servico_id || !status_id || !data_hora_inicio || !data_hora_fim) {
            throw new Error("Dados do agendamento incompletos.");
        }

        const inicio = this._parseDateTime(data_hora_inicio);
        const fim = this._parseDateTime(data_hora_fim);
        if (!inicio || !fim) {
            throw new Error("Data/hora inválida.");
        }

        if (fim <= inicio) {
            throw new Error("Data/hora de fim deve ser posterior à data/hora de início.");
        }

        if (inicio.toDateString() !== fim.toDateString()) {
            throw new Error("Agendamento deve começar e terminar no mesmo dia.");
        }

        const diaSemana = inicio.getDay().toString();
        const horariosTrabalho = await horarioTrabalhoModel.findByProfissionalAndDia(profissional_id, diaSemana);

        if (!horariosTrabalho || horariosTrabalho.length === 0) {
            throw new Error("Horário indisponível: profissional não trabalha nesse dia.");
        }

        const inicioAgendamentoMinutos = this._timeToMinutes(this._formatTime(inicio));
        const fimAgendamentoMinutos = this._timeToMinutes(this._formatTime(fim));

        const dentroDoTurno = horariosTrabalho.some((horario) => {
            const inicioTurno = this._timeToMinutes(horario.hora_inicio);
            const fimTurno = this._timeToMinutes(horario.hora_fim);
            return inicioAgendamentoMinutos >= inicioTurno && fimAgendamentoMinutos <= fimTurno;
        });

        if (!dentroDoTurno) {
            throw new Error("Horário indisponível: profissional não trabalha nesse horário.");
        }

        const bloqueios = await horarioBloqueadoModel.findOverlappingByProfissional(profissional_id, data_hora_inicio, data_hora_fim);
        if (bloqueios && bloqueios.length > 0) {
            throw new Error("Horário indisponível: existe bloqueio para este profissional nesse período.");
        }

        const conflitos = await agendamentoModel.findOverlappingByProfissional(profissional_id, data_hora_inicio, data_hora_fim);
        if (conflitos && conflitos.length > 0) {
            throw new Error("Horário indisponível: já existe outro agendamento nesse período para este profissional.");
        }

        return await agendamentoModel.create({
            ...agendamento,
            criado_em: agendamento.criado_em || this._formatDateTime(new Date()),
        });
    }

    static async updateAgendamento(id, agendamento) {
        const existing = await agendamentoModel.findById(id);
        if (!existing) {
            throw new Error(`Agendamento não encontrado.`);
        }

        const now = new Date();
        const inicioExistente = this._parseDateTime(existing.data_hora_inicio);
        if (!inicioExistente) {
            throw new Error("Agendamento existente com data/hora inválida.");
        }

        // Cancellation: require at least 2 hours before start
        const incomingStatus = agendamento.status_id;
        const isCancel = String(incomingStatus) === "3";
        if (isCancel) {
            const twoHoursBefore = new Date(inicioExistente.getTime() - 2 * 60 * 60 * 1000);
            if (now > twoHoursBefore) {
                throw new Error("Cancelamento só permitido com no mínimo 2 horas de antecedência.");
            }
            const updatedRows = await agendamentoModel.update(id, { ...existing, ...agendamento });
            if (updatedRows === 0) {
                throw new Error(`Agendamento não encontrado.`);
            }
            return updatedRows;
        }

        // Re-schedule: if times changed, cancel current (respecting 2h rule) and create a new agendamento
        const datesChanged = agendamento.data_hora_inicio && agendamento.data_hora_fim &&
            (agendamento.data_hora_inicio !== existing.data_hora_inicio || agendamento.data_hora_fim !== existing.data_hora_fim);

        if (datesChanged) {
            const twoHoursBefore = new Date(inicioExistente.getTime() - 2 * 60 * 60 * 1000);
            if (now > twoHoursBefore) {
                throw new Error("Reagendamento só permitido com no mínimo 2 horas de antecedência do horário atual.");
            }

            // mark existing as canceled (status_id = 3)
            await agendamentoModel.update(id, { ...existing, status_id: 3 });

            // create new appointment using existing validations
            const newId = await this.createAgendamento(agendamento);
            return newId;
        }

        // Default update (no reschedule/cancel)
        const updatedRows = await agendamentoModel.update(id, { ...existing, ...agendamento });
        if (updatedRows === 0) {
            throw new Error(`Agendamento não encontrado.`);
        }
        return updatedRows;
    }

    static async deleteAgendamento(id) {
        const deletedRows = await agendamentoModel.delete(id);
        if (deletedRows === 0) {
            throw new Error(`Agendamento não encontrado.`);
        }
        return deletedRows;
    }

    static _parseDateTime(datetime) {
        if (datetime instanceof Date) {
            return datetime;
        }

        if (typeof datetime === "number") {
            const date = new Date(datetime);
            return Number.isNaN(date.getTime()) ? null : date;
        }

        if (typeof datetime !== "string") {
            return null;
        }

        const [datePart, timePart] = datetime.split(" ");
        if (!datePart || !timePart) {
            return null;
        }
        const [year, month, day] = datePart.split("-").map(Number);
        const [hours, minutes, seconds] = timePart.split(":").map(Number);
        if ([year, month, day, hours, minutes, seconds].some((value) => Number.isNaN(value))) {
            return null;
        }
        return new Date(year, month - 1, day, hours, minutes, seconds);
    }

    static _formatTime(date) {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    static _timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    }

    static _formatDateTime(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

module.exports = agendamentoService;