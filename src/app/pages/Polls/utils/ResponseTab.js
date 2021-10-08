import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ResponseTab(props) {
  const classes = useStyles();

  const [formData, setFormData] = useState({});
  const [responseData, setResponseData] = useState([]);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    if(props.formData){
     // console.log(props.formData.questions.length);
      setQuestions(props.formData.questions)
      setFormData(props.formData)
      }
      var formId = props.formId
      if(formId !== undefined && formId !== ""){
        /*formService.getResponse(formId)
        .then((data) => {
      //      console.log(data);
            setResponseData(data)
           },
           error => {
           const resMessage =
               (error.response &&
               error.response.data &&
               error.response.data.message) ||
               error.message ||
               error.toString();
               console.log(resMessage);
           }
       );*/
      }
    },[props.formId, props.formData]);


    function getSelectedOption(qId, i, j){
      var oneResData = responseData[j];
      //console.log(oneResData);

      var selectedOp = oneResData.response.filter(qss => qss.questionId === qId);
     console.log(selectedOp);

      if(selectedOp.length > 0){

        var finalOption = questions[i].options.find(oo => oo._id === selectedOp[0].optionId);
        return finalOption.optionText
      } else{
        return "not attempted"
      }
    };

  return (
       <div>
          <p> Responses</p>
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    {questions.map((ques, i)=>(
                      <TableCell key={i} align="right">{ques.questionText}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {responseData.map((rs, j) => (
                  <TableRow key={j}>
                    <TableCell component="th" scope="row">
                      {rs.userId}
                    </TableCell>
                    {questions.map((ques, i)=>(
                    <TableCell key={i} align="right">{getSelectedOption(ques._id, i,j)}</TableCell>
                    ))}
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
       </div>
  );
}
export default ResponseTab;
