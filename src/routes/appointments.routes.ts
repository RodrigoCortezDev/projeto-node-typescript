import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

//List
appointmentsRouter.get('/', async (req, res) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();
	return res.json(appointments);
});

//Create
appointmentsRouter.post('/', async (req, res) => {
	try {
		//Pegando variaveis do corpo
		const { provider, date } = req.body;

		//Convertendo a data, pegando a data com a hora inicial do dia
		const parsedDate = parseISO(date);

		//Criando o service
		const createAppointment = new CreateAppointmentsService();

		//Executando a criação
		const appointment = await createAppointment.execute({ provider, date: parsedDate });

		//retornando o agendamento cadastrado
		return res.json(appointment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

export default appointmentsRouter;
