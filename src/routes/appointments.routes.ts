import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//List
appointmentsRouter.get('/', (req, res) => {
	const appointments = appointmentsRepository.all();
	return res.json(appointments);
});

//Create
appointmentsRouter.post('/', (req, res) => {
	try {
		//Pegando variaveis do corpo
		const { provider, date } = req.body;

		//Convertendo a data, pegando a data com a hora inicial do dia
		const parsedDate = parseISO(date);

		//Criando o service
		const createAppointment = new CreateAppointmentsService(appointmentsRepository);

		//Executando a criação
		const appointment = createAppointment.execute({ provider, date: parsedDate });

		//retornando o agendamento cadastrado
		return res.json(appointment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

export default appointmentsRouter;
