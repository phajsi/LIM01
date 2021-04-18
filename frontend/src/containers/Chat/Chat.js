import React, { useEffect, useState } from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {
  Card,
  CardHeader,
  Grid,
  ButtonGroup,
  Button,
  Paper,
  Toolbar,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import gingerMan from '../../assets/images/gingerMan.png';
import capsMan from '../../assets/images/capsMan.png';
import frenchMan from '../../assets/images/frenchMan.png';
import brunetteWoman from '../../assets/images/brunetteWoman.png';
import blondeWoman from '../../assets/images/blondeWoman.png';
import muslimWoman from '../../assets/images/muslimWoman.png';
import defaultMan from '../../assets/images/defaultMan.png';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import NextExerciseBtn from '../../components/NextExerciseBtn/NextExerciseBtn';
import useStyles from './styles';
import ProgressBar from '../../components/ProgressBar';
import { axiosInstanceGet } from '../../helpers/ApiFunctions';

const Chat = ({ id, showFeedback, progress, possible, restartSet }) => {
  const [sendericon, setSendericon] = useState();
  const [receivericon, setReceivericon] = useState();
  const [answerstate, setAnswerstate] = useState(null);
  const [taskStep, setTaskStep] = useState(1);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibeScore] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);

  const classes = useStyles();

  const [formData, setFormData] = useState({});

  const transformIcon = (iconName) => {
    switch (iconName) {
      case 'gingerMan':
        return gingerMan;
      case 'capsMan':
        return capsMan;
      case 'frenchMan':
        return frenchMan;
      case 'brunetteWoman':
        return brunetteWoman;
      case 'blondeWoman':
        return blondeWoman;
      case 'muslimWoman':
        return muslimWoman;
      default:
        return defaultMan;
    }
  };

  function getContent() {
    axiosInstanceGet()
      .get(`/chat/${id}`)
      .then((res) => {
        chatHistory.push(res.data.chatquestion1);
        setFormData(res.data);
        const avatarS = transformIcon(res.data.sendericon);
        setSendericon(avatarS);
        const avatarR = transformIcon(res.data.receivericon);
        setReceivericon(avatarR);
      });
  }

  const handleNextTask = () => {
    setAnswerstate(null);
    setChatHistory([formData[`chatquestion${taskStep}`]]);
    if (!formData[`chatquestion${taskStep}`]) {
      showFeedback(score, totalPossibleScore);
    } else {
      chatHistory.push(formData[`chatquestion${taskStep}`]);
    }
  };

  function handleAnswer(answer) {
    if (answer === formData[`correctanswer${taskStep}`]) {
      setAnswerstate('correct');
      setScore(score + 1);
      setTotalPossibeScore(totalPossibleScore + 1);
    } else {
      setAnswerstate('incorrect');
      setTotalPossibeScore(totalPossibleScore + 1);
    }
    setTaskStep(taskStep + 1);
    chatHistory.push(answer);
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Paper className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar component="nav" className={classes.toolbar}>
          {restartSet()}
        </Toolbar>
      </AppBar>
      <Paper className={classes.layout} elevation={0}>
        <div className={classes.progresscontainer}>
          <ProgressBar progress={progress} possible={possible} />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.header}>
              <CardHeader
                avatar={<VolumeUpIcon />}
                title="Du har fått en melding! Trykk på det svaret som er riktig."
              />
            </Card>
          </Grid>
          {chatHistory.map((chat, i) => {
            if (i % 2 === 0) {
              return <ChatBubble chat={chat} icon={sendericon} />;
            }
            return <ChatBubble chat={chat} icon={receivericon} right />;
          })}
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
          >
            {answerstate === null && (
              <>
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical contained secondary button group"
                  variant="contained"
                  color="secondary"
                  disableElevation
                  className={classes.btn}
                >
                  <Button
                    style={{ borderRadius: '25px', color: 'white' }}
                    id={1}
                    onClick={() =>
                      // eslint-disable-next-line prettier/prettier
                      handleAnswer(formData[`answer${taskStep}1`])}
                  >
                    {formData[`answer${taskStep}1`]}
                  </Button>
                  <Button
                    className={classes.btn}
                    onClick={() =>
                      // eslint-disable-next-line prettier/prettier
                      handleAnswer(formData[`answer${taskStep}2`])}
                    style={{ marginTop: 3, borderRadius: '25px' }}
                  >
                    {formData[`answer${taskStep}2`]}
                  </Button>
                  <Button
                    className={classes.btn}
                    onClick={() =>
                      // eslint-disable-next-line prettier/prettier
                      handleAnswer(formData[`correctanswer${taskStep}`])}
                    style={{ marginTop: 3, borderRadius: '25px' }}
                  >
                    {formData[`correctanswer${taskStep}`]}
                  </Button>
                </ButtonGroup>
              </>
            )}
          </Grid>
          <NextExerciseBtn
            answerState={answerstate}
            handleNextTask={handleNextTask}
          />
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Chat;
