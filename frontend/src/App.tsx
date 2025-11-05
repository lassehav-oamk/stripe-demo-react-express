import { Routes, Route } from 'react-router';
import CheckoutView from './views/CheckoutView';
import SuccessView from './views/SuccessView';



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckoutView />} />
      <Route path="/success" element={<SuccessView />} />
    </Routes>
  );
}