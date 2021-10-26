import React ,{useState, useEffect }from 'react'
//import QuestionHeader from './QuestionHeader';
import {Grid} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

function QuestionsTab(props){

    const [ questions, setQuestions ] = useState([]);
    const [ openUploadImagePop, setOpenUploadImagePop] = useState(false);
    const [imageContextData, setImageContextData] = useState({question: null, option: null});
    const [formData, setFormData] = useState({});
    const [loadingFormData, setLoadingFormData] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
      let data = props.formData.json_body;
      console.log(data);
      if(data !== undefined){
        if(props.formData.json_body.questions.length === 0){
          setQuestions([{questionText: "Question", options : [{optionText: "Option 1"}], open: false}]);
        } else{
          setQuestions(props.formData.json_body.questions)
        }
        setLoadingFormData(false)
      }
      setFormData(props.formData)

    }, [props.formData])

    function saveQuestions(){
      let date = new Date().getTime();
      console.log("auto saving questions initiated");
      var data = {
        formId: formData.id,
        name: formData.name,
        description: formData.description,
        processID:formData.processID,
        createdAt:formData.createdAt,
        updateAt:date,
        questions: questions
      }
      console.log(data);

      /*formService.autoSave(data)
      .then((result) => {
          console.log(result);
          setQuestions(result.questions)
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
      };

    function checkImageHereOrNotForQuestion(gg){
     // console.log(gg);
      if ((gg === undefined)||(gg==="")){
        return false;
      } else{
        return true;
      }
    };
    function checkImageHereOrNotForOption(gg){
      // console.log(gg);
      if ((gg === undefined)||(gg==="")){
        return false;
      } else{
        return true;
      }
    };

    function addQuestionClosed() {
      setOpen(false);
      expandCloseAll();
      setQuestions(questions=> [...questions, {questionText: "Question", options : [{optionText: "Option 1"}], open: true, type:"closed", subsistemaId:1, variableId:1}]);
    };

    function addQuestionMultiple(){
      setOpen(false);
      expandCloseAll();
      setQuestions(questions=> [...questions, {questionText: "Question", options : [{optionText: "Option 1"}], open: true, type:"multiple", subsistemaId:1, variableId:1}]);
    };

    function addQuestionOpen(){
      setOpen(false);
      expandCloseAll();
      setQuestions(questions=> [...questions, {questionText: "Question", options : [], open: true, type:"open", subsistemaId:1, variableId:1}]);
    };

    function addMoreQuestionField(){
      setOpen(true);
    }

    function copyQuestion(i){
      let qs = [...questions];
      expandCloseAll();
      const myNewOptions = [];
      qs[i].options.forEach(opn => {
        if ((opn.optionImage !== undefined)||(opn.optionImage !=="")) {
            var opn1new = {
            optionText : opn.optionText,
            optionImage: opn.optionImage
          }
        } else{
          var opn1new = {
            optionText : opn.optionText
          }
        }
      myNewOptions.push(opn1new)
      });
      const qImage = qs[i].questionImage || "";
      var newQuestion = {questionText: qs[i].questionText, questionImage : qImage ,options:myNewOptions, open: true}
    setQuestions(questions=> [...questions, newQuestion]);
  };

    const handleImagePopupOpen = () => {
      setOpenUploadImagePop(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


    function uploadImage(i, j){

        setImageContextData({
        question: i,
        option: j
      });
      handleImagePopupOpen();
    };

    function updateImageLink(link, context){

      var optionsOfQuestion = [...questions];
      var i = context.question

      if (context.option == null) {
        optionsOfQuestion[i].questionImage= link;
      } else {
        var j = context.option
        optionsOfQuestion[i].options[j].optionImage = link;
      }
      setQuestions(optionsOfQuestion);
    };

    function deleteQuestion(i){
      let qs = [...questions];
      if(questions.length > 1){
        qs.splice(i, 1);
      }
      setQuestions(qs)
    };

    function handleOptionValue(text,i, j){
      var optionsOfQuestion = [...questions];
      optionsOfQuestion[i].options[j].optionText = text;
      setQuestions(optionsOfQuestion);
    };

    function handleQuestionValue(text, i){
      var optionsOfQuestion = [...questions];
      optionsOfQuestion[i].questionText = text;
      setQuestions(optionsOfQuestion);
    };

    function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
      var itemgg = [...questions];

      const itemF = reorder(
        itemgg,
        result.source.index,
        result.destination.index
      );

      setQuestions(itemF);
    };

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    function showAsQuestion(i){
      let qs = [...questions];
      qs[i].open = false;
      setQuestions(qs);
    };

    function addOption(i){
      var optionsOfQuestion = [...questions];
      if(optionsOfQuestion[i].options.length < 5){
        optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
      } else{
        console.log("Max  5 options ");
      }
      setQuestions(optionsOfQuestion)
    };

    function removeOption(i, j){
      var optionsOfQuestion = [...questions];
      if(optionsOfQuestion[i].options.length > 1){
        optionsOfQuestion[i].options.splice(j, 1);
        setQuestions(optionsOfQuestion)
        console.log(i + "__" + j);
      }
    };

    function expandCloseAll(){
      let qs = [...questions];
      for (let j = 0; j < qs.length; j++) {
        qs[j].open = false;
      }
      setQuestions(qs);
    };

    function handleExpand(i){
      let qs = [...questions];
      for (let j = 0; j < qs.length; j++) {
        if(i ===j ){
          qs[i].open = true;
        } else{
          qs[j].open = false;
        }
      }
      setQuestions(qs);
    };

    function questionA(){
      return
    };

    function questionsUI(){
      return  questions.map((ques, i)=> (
        <Draggable key={i} draggableId={i + 'id'} index={i}>
          {(provided, snapshot) => (
              <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps} >
                <div>
                  <div style={{marginBottom: "15px"}}>
                    <div style={{ alignItems: 'center', width:'100%', marginBottom: '-7px' }}>
                      <i className="pi pi-th-large" style={{ color:'black' ,fontSize: '1rem' }}></i>
                    </div>
                    <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
                      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{width:'100%'}}>
                        { !questions[i].open ? (
                          <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px'}}>
                            <Typography variant="subtitle1" style={{marginLeft: '0px'}}>{i+1}.  {ques.questionText}</Typography>
                            {ques.questionImage !==""?(
                              <div>
                                <img src={ques.questionImage} width="400px" height="auto" /><br></br><br></br>
                              </div>
                            ): "" }
                            {ques.type == "open" ?(
                              <div style={{display:'flex'}}>
                                <TextField id='standard-basic' label='Enter your answer' variant='standard' />
                              </div>
                            ):( ques.options.map((op, j)=>(
                              <div key={j}>
                                <div style={{display: 'flex'}}>
                                <FormControlLabel disabled control={<Radio style={{marginRight: '3px', }} />} label={
                                  <Typography style={{color: '#555555'}}>
                                    {ques.options[j].optionText}
                                  </Typography>
                                } />
                                </div>
                                <div>
                                  {op.optionImage !==""?(
                                    <img src={op.optionImage} width="160px" height="auto" />
                                  ): "" }
                                </div>
                              </div>
                            )))}
                          </div>
                        ): ""}
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', marginTop:'-15px'}}>
                          <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                            <Typography style={{marginTop:'20px'}}>{i+1}.</Typography>
                              <TextField
                              fullWidth={true}
                              placeholder="Question Text"
                              style={{marginBottom: '18px'}}
                              rows={2}
                              rowsMax={20}
                              multiline={true}
                              value={ques.questionText}
                              variant="filled"
                              onChange={(e)=>{handleQuestionValue(e.target.value, i)}} />
                              <IconButton aria-label="upload image" onClick={()=>{uploadImage(i, null)}}>
                                <i className="pi pi-images"></i>
                              </IconButton>
                          </div>
                        <div>
                          { checkImageHereOrNotForQuestion(ques.questionImage) ? (
                            <div>
                              <div style={{width:'150px', display: 'flex', alignItems:'flex-start', paddingLeft:'20px'}}>
                                <img src={ques.questionImage} width="150px" height="auto"/>
                                <IconButton style={{marginLeft: '-15px', marginTop: '-15px',zIndex:999, backgroundColor: 'lightgrey', color:'grey'}}
                                      size="small"
                                      onClick={()=>{
                                        updateImageLink("", {question: i, option: null})
                                      }}>
                                      <i className="pi pi-times"></i>
                                </IconButton>
                              </div>
                            </div>
                          ): ""}
                        </div>
                        <div style={{width: '100%'}}>
                          {ques.type == "open" ?(
                            <div style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px'}}>
                              <TextField id='standard-basic' label='Enter your answer' variant='standard' />
                            </div>
                          ):(ques.options.map((op, j)=>(
                            <div key={j}>
                              <div style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px'}}>
                                <Radio disabled />
                                <TextField
                                  fullWidth={true}
                                  placeholder="Option text"
                                  style={{marginTop: '5px'}}
                                  value={ques.options[j].optionText}
                                  onChange={(e)=>{handleOptionValue(e.target.value, i, j)}} />
                                <IconButton aria-label="upload image" onClick={()=>{uploadImage(i, j)}}>
                                  <i className="pi pi-images"></i>
                                </IconButton>
                                <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                                  <i className="pi pi-times"></i>
                                </IconButton>
                              </div>
                              <div>
                                {checkImageHereOrNotForOption(op.optionImage) ? (
                                  <div>
                                    <div style={{width:'150px', display: 'flex', alignItems:'flex-start', paddingLeft:'20px'}}>
                                      <img src={op.optionImage} width="90px" height="auto"/>
                                      <IconButton
                                        style={{marginLeft: '-15px', marginTop: '-15px',zIndex:999, backgroundColor: 'lightgrey', color:'grey'}}
                                        size="small"
                                        onClick={()=>{updateImageLink("", {question: i, option: j})}}>
                                        <i className="pi pi-times"></i>
                                      </IconButton>
                                    </div>
                                    <br></br>
                                    <br></br>
                                  </div>
                                ): "" }
                              </div>
                            </div>
                          )))}
                        </div>
                        {ques.type == 'open'?(''):(ques.options.length < 5 ? (
                          <div>
                            <FormControlLabel disabled control={<Radio />} label={
                              <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none', marginLeft:"-5px"}}>
                                Add Option
                              </Button> } />
                          </div>
                        ): "")}
                        <br></br>
                        <br></br>
                        {ques.type == 'open'?(''):(<Typography variant="body2" style={{color: 'grey'}}>You can add maximum 5 options. If you want to add more then change in settings. Multiple choice single option is availible</Typography>)}
                        </div>
                      </AccordionDetails>
                      <Divider />
                      <AccordionActions>
                        <IconButton aria-label="View" onClick={()=>{showAsQuestion(i)}}>
                          <i className="pi pi-check"></i>
                        </IconButton>
                        <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                          <i className="pi pi-clone"></i>
                        </IconButton>
                        <Divider orientation="vertical" flexItem/>
                        <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                          <i className="pi pi-trash"></i>
                        </IconButton>
                      </AccordionActions>
                    </Accordion>
                  </div>
                </div>
              </div>
          )}
        </Draggable>
       )
      )
    };




    return (
      <div style={{marginTop:'15px', marginBottom: '7px', paddingBottom:"30px"}}>
         <Grid
          container
          direction="column"
          justify="center"
          alignItems="center">
            {loadingFormData ? (<CircularProgress />):""}
           <Grid item xs={12} sm={5} style={{width: '100%'}}>
                <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}>
                    <div>
                        <div>
                          <Paper elevation={2} style={{width:'100%'}}>
                            <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                              <Typography variant="h5" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
                                {formData.name}
                              </Typography>
                              <Typography variant="subtitle1">{formData.description}</Typography>
                            </div>
                          </Paper>
                        </div>
                    </div>
                </Grid>
                <Grid style={{paddingTop: '10px'}}>
                  <div>
                    {/*<ImageUplaodModel handleImagePopOpen={openUploadImagePop} handleImagePopClose={()=>{setOpenUploadImagePop(false)}} updateImageLink={updateImageLink} contextData={imageContextData}/>*/}
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {questionsUI()}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                  </DragDropContext>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description' >
                    <DialogTitle id='alert-dialog-newQ'>{'CHOOSE THE TYPE OF QUESTION'}</DialogTitle>
                    <DialogActions>
                      <Button onClick={addQuestionMultiple} disableElevation color="primary">
                        Multiple
                      </Button>
                      <Button onClick={addQuestionClosed} color="primary">
                        Closed
                      </Button>
                      <Button onClick={addQuestionOpen} color="primary">
                        Open
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <div style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
                      <Button
                        variant="contained"
                        onClick={addMoreQuestionField}
                        icon={'pi pi-more'}
                        style={{margin: '5px'}} >Add Question </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={saveQuestions}
                        icon = {'pi pi-check'}
                        style={{margin: '15px'}}>Save Questions </Button>
                    </div>
                  </div>
                </Grid>
            </Grid>
         </Grid>
     </div>
    );
};
export default QuestionsTab;
