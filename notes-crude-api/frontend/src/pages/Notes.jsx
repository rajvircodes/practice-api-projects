import { useState,useEffect} from "react";
import axios from 'axios'


const Notes = () => {
   const [data, setData] = useState([]);

    useEffect(() => {
  axios.get('/api/v1/notes')
    .then(res => {
      // console.log("Backend se kya aaya:", res.data);
         setData(res.data.data); 
    })
    .catch(err => console.log("Locha hai bhai", err));
}, []);


   return (
      data.map((d) => <div key={d._id} style={styles.container}>
         <h2 style={styles.title}>{d.title} </h2>
         <p style={styles.content}>{d.content}</p>
      </div>)

   )

}

const styles = {
   container: {
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      textAlign: 'center',

   },
   title: {
      color: '#2c3e50',
      fontSize: '2rem',
      marginBottom: '10px'
   },
   content: {
      fontSize: "2rem"
   }
};


export default Notes