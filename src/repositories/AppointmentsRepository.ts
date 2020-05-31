import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

class AppointmentsRepository {
	private appointments: Appointment[];

	/** Repositorio de Agendamentos - Ações referente aos agendamentos */
	constructor() {
		this.appointments = [];
	}

	/** Cria um novo Agendamento */
	public create(provider: string, date: Date): Appointment {
		const appointment = new Appointment(provider, date);
		this.appointments.push(appointment);

		return appointment;
	}

	/** Procura um agendamento baseado numa data */
	public findByDate(date: Date): Appointment | null {
		const findAppointmentByDate = this.appointments.find(appointment => isEqual(date, appointment.date));
		return findAppointmentByDate || null;
	}
}

export default AppointmentsRepository;
