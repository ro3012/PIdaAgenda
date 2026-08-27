const horarioTrabalhoModel = require("../models/horarioTrabalhoModel");
const horarioBloqueadoModel = require("../models/horarioBloqueadoModel");
const agendamentoModel = require("../models/agendamentoModel");

class slotsService {
    static async consultarDisponibilidade(profissional_id, data) {
        const dataObj = new Date(data);
        if (Number.isNaN(dataObj.getTime())) {
            throw new Error("Data inválida.");
        }

        const diaSemana = dataObj.getDay(); // 0 (Domingo) a 6 (Sábado)
        const horariosTrabalho = await horarioTrabalhoModel.findByProfissionalAndDia(profissional_id, diaSemana.toString());
        if (!horariosTrabalho || horariosTrabalho.length === 0) {
            throw new Error("Profissional não trabalha nesse dia.");
        }

        const dataInicio = `${data} 00:00:00`;
        const nextDay = new Date(dataObj);
        nextDay.setDate(nextDay.getDate() + 1);
        const dataFim = `${nextDay.getFullYear().toString().padStart(4, '0')}-${(nextDay.getMonth() + 1).toString().padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')} 00:00:00`;

        const agendamentos = await agendamentoModel.findByProfissionalAndData(profissional_id, dataInicio, dataFim);
        const horariosBloqueados = await horarioBloqueadoModel.findByProfissionalAndData(profissional_id, dataInicio, dataFim);

        const bloqueios = [
            ...agendamentos.map((agendamento) => ({
                inicio: this._datetimeParaMinutos(agendamento.data_hora_inicio),
                fim: this._datetimeParaMinutos(agendamento.data_hora_fim),
            })),
            ...horariosBloqueados.map((bloqueado) => ({
                inicio: this._datetimeParaMinutos(bloqueado.inicio),
                fim: this._datetimeParaMinutos(bloqueado.fim),
            })),
        ];

        const slots = [];
        for (const horario of horariosTrabalho) {
            const inicioMinutos = this._horaParaMinutos(horario.hora_inicio);
            const fimMinutos = this._horaParaMinutos(horario.hora_fim);

            if (inicioMinutos >= fimMinutos) {
                continue;
            }

            let current = inicioMinutos;
            while (current + 30 <= fimMinutos) {
                const slotInicio = current;
                const slotFim = current + 30;
                const isAvailable = !bloqueios.some((bloqueio) => slotInicio < bloqueio.fim && slotFim > bloqueio.inicio);

                if (isAvailable) {
                    slots.push({
                        inicio: this._minutosParaHora(slotInicio),
                        fim: this._minutosParaHora(slotFim),
                    });
                }
                current = slotFim;
            }
        }
        return slots;
    }

    static _horaParaMinutos(hora) {
        const [h, m] = hora.split(":").map(Number);
        return h * 60 + m;
    }

    static _minutosParaHora(minutos) {
        const h = Math.floor(minutos / 60);
        const m = minutos % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }

    static _datetimeParaMinutos(datetime) {
        const date = new Date(datetime);
        return date.getHours() * 60 + date.getMinutes();
    }
}

module.exports = slotsService;