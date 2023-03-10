import React,{useEffect,useState} from 'react'
import axios from 'axios'

function MaquinaList() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const url="http://localhost:8080/maquina/all";
        const response = await axios.get(url);
        console.log(response)
        setData(response.data);

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
    </div>
  )
}

export default MaquinaList
