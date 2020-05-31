import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//List
appointmentsRouter.get('/', (req, res) => {
	const appointments = appointmentsRepository.all();
	return res.json(appointments);
});

//Create
appointmentsRouter.post('/', (req, res) => {
	const { provider, date } = req.body;

	//Convertendo a data, pegando a data com a hora inicial do dia
	const parsedDate = startOfHour(parseISO(date));

	//tentando encontrar um agendamento com a mesma data
	const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);
	if (findAppointmentInSameDate) {
		res.status(400).json({ message: 'Data já está sendo utilizada!' });
	}

	//Criando o agendamento
	const appointment = appointmentsRepository.create({ provider, date: parsedDate });

	//retornando o agendamento cadastrado
	return res.json({ Inserido: appointment });
});

export default appointmentsRouter;
