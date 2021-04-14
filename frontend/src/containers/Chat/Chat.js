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
  IconButton,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
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

const Chat = ({ id, showFeedback, progress, possible }) => {
  const [chatquestion, setChatquestion] = useState(null);
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [sendericon, setSendericon] = useState();
  const [receivericon, setReceivericon] = useState();
  const [correctanswer, setCorrectanswer] = useState(null);
  const [answerchoice, setAnswerchoice] = useState(null);
  const [answerstate, setAnswerstate] = useState(null);
  const [taskStep, setTaskStep] = useState(1);
  const [select, setSelect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibeScore] = useState(0);

  const classes = useStyles();

  const [formData, setFormData] = useState({
    chatquestion1: '',
    answer11: '',
    answer12: '',
    correctanswer1: '',
    chatquestion2: '',
    answer21: '',
    answer22: '',
    correctanswer2: '',
    chatquestion3: '',
    answer31: '',
    answer32: '',
    correctanswer3: '',
  });

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
        setFormData(res.data);
        setChatquestion(res.data.chatquestion1);
        setAnswer1(res.data.answer11);
        setAnswer2(res.data.answer12);
        const avatarS = transformIcon(res.data.sendericon);
        setSendericon(avatarS);
        const avatarR = transformIcon(res.data.receivericon);
        setReceivericon(avatarR);
        setCorrectanswer(res.data.correctanswer1);
      });
  }

  function isTrue() {
    if (taskStep < 4) {
      setTaskStep(taskStep + 1);
      if (answerchoice === correctanswer) {
        setAnswerstate('correct');
        setScore(score + 1);
        setTotalPossibeScore(totalPossibleScore + 1);
      } else {
        setAnswerstate('incorrect');
        setTotalPossibeScore(totalPossibleScore + 1);
      }
    }
    // eslint-disable-next-line no-restricted-globals
    return null;
  }

  const handleNextTask = () => {
    setAnswerstate(null);
    if (taskStep === 2 && formData.chatquestion2 !== '') {
      setChatquestion(formData.chatquestion2);
      setAnswer1(formData.answer21);
      setAnswer2(formData.answer22);
      setCorrectanswer(formData.correctanswer2);
    } else if (taskStep === 3 && formData.chatquestion3 !== '') {
      setChatquestion(formData.chatquestion3);
      setAnswer1(formData.answer31);
      setAnswer2(formData.answer32);
      setCorrectanswer(formData.correctanswer3);
    } else {
      showFeedback(score, totalPossibleScore);
    }
    setSelect(false);
  };

  function validateChoice() {
    if (answerchoice != null) {
      isTrue();
      setSelect(true);
    }
  }

  useEffect(() => {
    if (chatquestion === null) {
      getContent();
    }
    validateChoice();
  }, [answerchoice]);

  return (
    <Paper className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <ProgressBar progress={progress} possible={possible} />
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper className={classes.layout} elevation={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.header}>
              <CardHeader
                avatar={<VolumeUpIcon />}
                title="Du har fått en melding! Trykk på det svaret som er riktig."
              />
            </Card>
          </Grid>
          <ChatBubble chat={chatquestion} icon={sendericon} />
          {select === true && (
            <ChatBubble chat={answerchoice} icon={receivericon} />
          )}
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
                  color="primary"
                  aria-label="vertical contained primary button group"
                  variant="contained"
                >
                  <Button id={1} onClick={() => setAnswerchoice(answer1)}>
                    {answer1}
                  </Button>
                  <Button
                    onClick={() => setAnswerchoice(answer2)}
                    style={{ marginTop: 3 }}
                  >
                    {answer2}
                  </Button>
                  <Button
                    onClick={() => setAnswerchoice(correctanswer)}
                    style={{ marginTop: 3 }}
                  >
                    {correctanswer}
                  </Button>
                </ButtonGroup>
              </>
            )}
            <NextExerciseBtn
              answerState={answerstate}
              handleNextTask={handleNextTask}
            />
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Chat;
