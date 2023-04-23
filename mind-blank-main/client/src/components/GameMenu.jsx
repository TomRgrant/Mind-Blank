import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStatus, setCategory, setDifficulty } from "../state/quizSlice";
import { motion } from "framer-motion";
import { categories, difficulties } from "../constants";
import "./GameMenu.css";

const menuVariants = {
  initial: { scale: 0, x: "10vw" },
  animate: { scale: 1, x: 0, transition: { duration: 1 } },
};

const subMenuVariants = {
  visible: { scale: 1 },
  hidden: { scale: 0 },
};

const startButtonVariants = {
  initial: { scale: 0, y: "60vh" },
  animate: {
    scale: [1, 1.1, 1],
    y: 0,
    transition: {
      duration: 1,
      delay: 1,
      scale: { repeat: Infinity },
    },
  },
};

export function GameMenu() {
  const dispatch = useDispatch();
  const [hiddenCategory, setHiddenCategory] = useState(true);
  const [hiddenDifficulty, setHiddenDifficulty] = useState(true);

  function handleClick(e) {
    if (e.target.classList.contains("background-green")) {
      e.target.classList.remove("background-green");
    } else {
      e.target.classList.add("background-green");
    }
    dispatch(setCategory(e.target.textContent));
  }

  function handleDifficulty(e) {
    if (e.target.classList.contains("background-green")) {
      e.target.classList.remove("background-green");
    } else {
      e.target.classList.add("background-green");
    }
  }

  const categoryElements = categories.map((category, index) => (
    <motion.button
      initial="hidden"
      whileInView="visible"
      variants={subMenuVariants}
      className="menu-btn btn-color btn-category"
      key={index}
      onClick={(e) => handleClick(e)}
    >
      {category}
    </motion.button>
  ));

  const difficultyElements = difficulties.map((difficulty, index) => (
    <motion.button
      className="menu-btn btn-color btn-size"
      initial="hidden"
      whileInView="visible"
      variants={subMenuVariants}
      key={index}
      onClick={(e) => {
        handleDifficulty(e);
        dispatch(setDifficulty(e.target.textContent.toLowerCase()));
      }}
    >
      {difficulty}
    </motion.button>
  ));

  const handleHiddenCategory = () => {
    setHiddenCategory(!hiddenCategory);
    setHiddenDifficulty(true);
  };

  const handleHiddenDifficulty = () => {
    setHiddenDifficulty(!hiddenDifficulty);
    setHiddenCategory(true);
  };

  const handleStartGame = () => {
    dispatch(setStatus("play"));
  };

  return (
    <motion.div className="btn-container" initial="initial" animate="animate">
      <div>
        <motion.button
          className="menu-btn btn-size"
          onClick={handleHiddenCategory}
          variants={menuVariants}
        >
          Select Category
        </motion.button>
        <div hidden={hiddenCategory}>
          <div className="category-container">{categoryElements}</div>
        </div>
      </div>
      <div>
        <motion.button
          className="menu-btn btn-size"
          onClick={handleHiddenDifficulty}
          variants={menuVariants}
        >
          Select Difficulty
        </motion.button>
        <div hidden={hiddenDifficulty}>{difficultyElements}</div>
      </div>
      <motion.button
        className="start-quiz-btn btn-size"
        onClick={handleStartGame}
        variants={startButtonVariants}
      >
        Start Game!
      </motion.button>
    </motion.div>
  );
}
