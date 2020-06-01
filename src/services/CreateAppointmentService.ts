import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
	provider: string;
	date: Date;
}

/** Service responsavel pela criação do agendamento */
class CreateAppointmentService {
	//repositorio
	private appointmentsRepository: AppointmentsRepository;

	//Construtor
	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	//Principal e unico metodo do service
	public execute({ provider, date }: RequestDTO): Appointment {
		//Pega a data ignorando o horario
		const appointmentDate = startOfHour(date);

		//tentando encontrar um agendamento com a mesma data
		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

		//Se ja existe um agendamento para mesma data, retornar erro
		if (findAppointmentInSameDate) {
			throw Error('O Horário do agendamento já está em uso');
		}

		//Criando o agendamento
		const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

		//retornando o agendamento criado
		return appointment;
	}
}

export default CreateAppointmentService;
