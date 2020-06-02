import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	private appointments: Appointment[];

	/** Procura um agendamento baseado numa data */
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({
			where: { date },
		});

		return findAppointment || null;
	}
}

export default AppointmentsRepository;
