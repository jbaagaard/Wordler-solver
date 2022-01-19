import React, {ChangeEvent, useState} from 'react';
import './App.css';
import * as S from "./App.styled"
import {dict} from "./dictionary";

interface FullMatch {
    letter: string,
    index: number
}

function App() {
    const [noMatch, setNoMatch] = useState<string>("");
    const [partialMatch, setPartialMatch] = useState<string>("");
    const [fullMatch, setFullMatch] = useState<FullMatch[]>([]);
    const [addFullMatchindex, setAddFullMatchindex] = useState<number>(1);
    const [addFullMatchLetter, setAddFullMatchLetter] = useState<string>("");
    const [nextGuess, setNextGuess] = useState<string>("");
    let keys = dict.filter(w => w.length === 5)
    const [keyAmount, setKeyAmount] = useState(keys.length);
    let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let activeLetters = [...letters]

    function download(content: any, fileName: string, contentType: string) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function handleSave() {
        download(keys, 'json.json', 'json');
    }

    function handleNoMatchChange(event: ChangeEvent<HTMLInputElement>) {
        setNoMatch(event.currentTarget.value + "")
    }

    function handlePartialMatchChange(event: ChangeEvent<HTMLInputElement>) {
        setPartialMatch(event.currentTarget.value + "")
    }

    function handleFullMatchLetterChange(event: ChangeEvent<HTMLInputElement>) {
        setAddFullMatchLetter(event.currentTarget.value + "")
    }

    function handleFullMatchIndexChange(event: ChangeEvent<HTMLInputElement>) {
        setAddFullMatchindex(+event.currentTarget.value)
    }

    function generateNext() {
        console.log(keys.length);
        const nk = noMatch.split("")
        for (let i = 0; i < nk.length; i++) {
            keys = keys.filter(key => !key.includes(nk[i]))
        }
        const pk = partialMatch.split("")
        for (let i = 0; i < pk.length; i++) {
            keys = keys.filter(key => key.includes(pk[i]))
        }
        console.log(keys.length);

        for (let i = 0; i < fullMatch.length; i++) {
            keys = keys.filter(key => key.charAt(fullMatch[i].index - 1) === fullMatch[i].letter)
        }

        const usedLetters = [...nk, ...pk, ...fullMatch.map(l => l.letter)]
        activeLetters = activeLetters.filter(l => !usedLetters.find(ul => ul === l))
        const rankedLetters: { letter: string, amount: number }[] = []
        for (let i = 0; i < letters.length; i++) {
            rankedLetters.push({letter: letters[i], amount: keys.filter(k => k.includes(letters[i])).length})
        }

        const rankedKeys: { key: string, score: number }[] = []
        for (let i = 0; i < keys.length; i++) {
            let score = 0
            const keyChars = keys[i].replace(/[^a-zA-Z0-9]/g, '').split("");
            let usedChars = ""
            for (let i2 = 0; i2 < keyChars.length; i2++) {
                if (!usedChars.includes(keyChars[i2]))
                    score += rankedLetters.find(rl => rl.letter === keyChars[i2])!.amount
                usedChars = usedChars + keyChars[i2]
            }
            rankedKeys.push({key: keys[i], score: score})
        }
        const topKeys = rankedKeys.sort(compare).filter((rk, i) => i < 5).map(k => k.key)
        setNextGuess(topKeys.join(" "));
        setKeyAmount(keys.length);
        console.log({letters})
        console.log({rankedLetters})
        console.log({keys});
        console.log(rankedKeys);
        console.log(keys.length);
    }

    function compare(a: { key: string, score: number }, b: { key: string, score: number }) {
        if (a.score < b.score) {
            return 1;
        }
        if (a.score > b.score) {
            return -1;
        }
        return 0;
    }

    function handleAddFullMatch() {
        setFullMatch([...fullMatch, {letter: addFullMatchLetter, index: addFullMatchindex}])
        setAddFullMatchindex(1);
        setAddFullMatchLetter("");

    }

    return (
        <div className="App">
            <S.Content>
                <S.FlexColumn>
                    <S.Flex>
                        <S.Label>Not maching letters</S.Label>
                        <S.Input type="text" value={noMatch} onChange={handleNoMatchChange}/>
                    </S.Flex>
                    <S.LetterList>
                        {noMatch.split("").map(l=><S.Letter color={"#3A3A3C"}>{l}</S.Letter> )}
                    </S.LetterList>
                    <S.Flex>
                        <S.Label>Partial matching letters</S.Label>
                        <S.Input type="text" value={partialMatch} onChange={handlePartialMatchChange}/>
                    </S.Flex>
                    <S.LetterList>
                        {partialMatch.split("").map(l=><S.Letter color={"#B59F3B"}>{l}</S.Letter> )}
                    </S.LetterList>
                    <S.Flex>
                        <S.Label>Full matching letter</S.Label>
                        <S.Input type="text" value={addFullMatchLetter} onChange={handleFullMatchLetterChange}/>
                        <S.Label>Full matching index</S.Label>
                        <S.Input type="text" value={addFullMatchindex} onChange={handleFullMatchIndexChange}/>
                        <S.Button onClick={handleAddFullMatch}>Add full matching letter</S.Button>
                    </S.Flex>
                    <S.LetterList>
                        {fullMatch.map(l=><S.Letter color={"#538D4E"}>{l.letter}</S.Letter> )}
                    </S.LetterList>
                    <S.Button onClick={generateNext}>Generate Best Match</S.Button>
                    <S.Label>best guesses: {nextGuess}</S.Label>
                    <S.Label>{"total words: " + keyAmount}</S.Label>
                </S.FlexColumn>
            </S.Content>

        </div>
    );
}

export default App;
