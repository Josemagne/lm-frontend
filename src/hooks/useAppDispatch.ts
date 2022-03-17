import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/redux/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;