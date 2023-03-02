import './App.css';
import AuthProvider from "./context/authProvider";
import CombinedScreens from './combinedscreens/CombinedScreens';

function App() {
  return (
    <AuthProvider>
      <CombinedScreens />
    </AuthProvider>
  );
}

export default App;