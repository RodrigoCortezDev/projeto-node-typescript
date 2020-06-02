import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
	provider: string;
	date: Date;
}

/** Service responsavel pela criação do agendamento */
class CreateAppointmentService {
	//Principal e unico metodo do service
	public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
		//repositorio
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		//Pega a data ignorando o horario
		const appointmentDate = startOfHour(date);

		//tentando encontrar um agendamento com a mesma data
		const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

		//Se ja existe um agendamento para mesma data, retornar erro
		if (findAppointmentInSameDate) {
			throw Error('O Horário do agendamento já está em uso');
		}

		//Criando o agendamento
		const appointment = appointmentsRepository.create({ provider, date: appointmentDate });
		await appointmentsRepository.save(appointment);

		//retornando o agendamento criado
		return appointment;
	}
}

export default CreateAppointmentService;
