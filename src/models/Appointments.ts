import { uuid } from 'uuidv4';

class Appointment {
	id: string;
	provider: string;
	date: Date;

	//Ou Seja recebe todos os paramertos de Appointment OMITINDO o id
	constructor({ provider, date }: Omit<Appointment, 'id'>) {
		this.id = uuid();
		this.provider = provider;
		this.date = date;
	}
}

export default Appointment;
