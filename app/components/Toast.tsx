import { toast } from 'react-toastify';

const errorNotice = (msg: string) => toast.error(msg);
const successNotice = (msg: string) => toast.success(msg);

export { errorNotice, successNotice };
