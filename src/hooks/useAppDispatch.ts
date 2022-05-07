import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/redux/store';

const useAppDispatch = function () { return useDispatch<AppDispatch>() }

export default useAppDispatch;