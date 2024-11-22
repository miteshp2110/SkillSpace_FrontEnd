import './Home.css'
import {
    confirmEmailVerificationOtp,
    getDepartments,
    getRefreshToken,
    jwtStatus,
    login,
    sendEmailVerificationOtp, sendForgotPasswordEmail, updatePassword
} from "../../../utils/controllers/AuthControllers";

const Home =()=>{

    return <>
        <h1>
            Home common
        </h1>
        <button onClick={async () => {
            const res = await getDepartments();
            if (res.data.Error === true) {
                console.log(res.data.Error)
            } else {
                console.log(res.data);
            }
        }}>departments
        </button>
        <br/>
        <button onClick={async () => {
            const res = await jwtStatus();
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>jwt status
        </button>
        <br/>
        <button onClick={async () => {
            const res = await getRefreshToken();
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>refresh Token
        </button>
        <br/>
        <button onClick={async () => {
            const res = await login("sbibank3829@gmail.com", "gendu")
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>login
        </button>
        <br/>
        <button onClick={async () => {
            const res = await sendEmailVerificationOtp()
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>otp
        </button>
        <br/>
        <button onClick={async () => {
            const res = await confirmEmailVerificationOtp("paliwalmitesh2110@gmail.com", 2429)
            if (res.data.Error === true) {
                console.log(res.data.status === 400 ? "WrongOTP" : "Invalid Reqeust")
            } else {
                console.log(res.data);
            }
        }}>otp confirm
        </button>
        <br/>
        <button onClick={async () => {
            const res = await sendForgotPasswordEmail("sbibank3829@gmail.com")
            if (res.data.Error === true) {
                console.log(res.data.status)
            } else {
                console.log(res.data);
            }
        }}>forgt pass Otp
        </button>

        <br/>
        <button onClick={async () => {
            const res = await updatePassword("sbibank3829@gmail.com","gendu",7408)
            if (res.data.Error === true) {
                console.log(res.data.status === 400 ? "WrongOTP" : "Invalid Reqeust")
            } else {
                console.log(res.data);
            }
        }}>update Password
        </button>
        <p>
            There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.There are multiple matches for 1000 words, including a movie, a list of words, and how many pages 1000 words is:
            A Thousand Words: A 2012 movie about a dishonest agent who is cursed to die if he speaks more than 1,000 words. The movie stars Eddie Murphy, Kerry Washington, and Clark Duke, and was directed by Brian Robbins.
            List of 1,000 most common words: A list of the 1,000 most frequently used English words in alphabetical order. You can use this list to improve your vocabulary by copying it into a flashcard app or printing it out.
            Number of pages for 1,000 words: 1,000 words written by hand is roughly four pages long. This is because handwriting takes up about twice as much space as 12 pt Times New Roman text.
            My First 1,000 Words: An early learning picture book that helps children learn the alphabet.
            Vocabulary.com Top 1,000: A vocabulary list that includes teaching tools like quizzes, activities, and spelling bees.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.
            Wikipedia: List of 1,000 basic words: A list of 1,000 basic words on Wikipedia.
        </p>

    </>
}

export default Home