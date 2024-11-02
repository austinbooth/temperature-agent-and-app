import mongooseSingleton from '../mongooseSingleton';
import temperatureSchema from '../mongooseSchema';

export default mongooseSingleton.model('Temperature', temperatureSchema);
