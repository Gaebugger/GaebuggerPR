import { TailSpin } from 'react-loader-spinner';


const Spinner = () => (
    <div className="spinner-container" style={{position:"absolute", top:"40%", left: "35%" }}>
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
  

export default Spinner;