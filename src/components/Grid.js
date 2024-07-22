import { Stack, Paper, Fab } from "@mui/material";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';

const Grid = () => {

    const [marker, setMarker] = useState('X');
    const [gameOver, setGameOver] = useState(false);
    const [gridValues, setGridValues] = useState([['','',''],['','',''],['','','']]);
    const [winner, setWinner] = useState('');
    const [noOfCellsClicked, setNoOfCellsClicked] = useState(0);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '120px',
        lineHeight: '120px',
        width: '120px',
        fontSize: '40px'
    }));

    const checkGameOver = (row, col, value) => {

        let match = true;

        for(let i=0;i<3;i++){
            if(gridValues[row][i]!==value){
                match = false;
                break;
            }
        }

        if(match){
            setGameOver(true);
            setWinner(marker === 'X' ? 'Player 1' : 'Player 2');
            return;
        }

        match = true;

        for(let i=0;i<3;i++){
            if(gridValues[i][col]!==value){
                match = false;
                break;
            }
        }

        if(match){
            setGameOver(true);
            setWinner(marker === 'X' ? 'Player 1' : 'Player 2');
            return;
        }

        if(row === col){
            match = true;

            for(let i=0;i<3;i++){
                if(gridValues[i][i]!==value){
                    match = false;
                    break;
                }
            }

            if(match){
                setGameOver(true);
                setWinner(marker === 'X' ? 'Player 1' : 'Player 2');
                return;
            }
        }

        if(row + col === 2){
            match = true;
            
            for(let i=0;i<3;i++){
                if(gridValues[i][2-i]!==value){
                    match = false;
                    break;
                }
            }

            if(match){
                setGameOver(true);
                setWinner(marker === 'X' ? 'Player 1' : 'Player 2');
                return;
            }
        }
    }

    const handleClick = (row, col) => {

        if(!gameOver){
            if(gridValues[row][col] !== '')
                return;
    
            let arr = [...gridValues];
            arr[row][col] = marker;
            setGridValues(arr);
            setMarker(marker === 'X' ? 'O' : 'X');
            setNoOfCellsClicked(noOfCellsClicked + 1);
            checkGameOver(row, col, marker);
        }

    };

    const resetGame = () => {
        const arr = [['','',''],['','',''],['','','']];
        setGridValues(arr);
        setNoOfCellsClicked(0);
        setMarker('X');
        setGameOver(false);
        setWinner('');
    }

    return (
        <div>
            <div style={{marginBottom: '3%'}}>
                {gameOver ? `Winner: ${winner}` : noOfCellsClicked === 9 ? 'Match Drawn' : marker === 'X' ? "Player 1's Turn" : "Player 2's Turn"}
            </div>

            <Stack direction="row" spacing={'1%'} sx={{marginBottom: '1%'}}>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(0,0)}>{gridValues[0][0]}</Item>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(0,1)}>{gridValues[0][1]}</Item>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(0,2)}>{gridValues[0][2]}</Item>
            </Stack>
            <Stack direction="row" spacing={'1%'} sx={{marginBottom: '1%'}}>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(1,0)}>{gridValues[1][0]}</Item>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(1,1)}>{gridValues[1][1]}</Item>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(1,2)}>{gridValues[1][2]}</Item>
            </Stack>
            <Stack direction="row" spacing={'1%'} sx={{marginBottom: '1%'}}>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(2,0)}>{gridValues[2][0]}</Item>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(2,1)}>{gridValues[2][1]}</Item>
                <Item elevation={2} sx={{'&:hover': { cursor: 'pointer'}}} onClick={() => handleClick(2,2)}>{gridValues[2][2]}</Item>
            </Stack>

            {noOfCellsClicked > 0 && <Fab variant="extended" color="primary" sx={{marginTop: '2%'}} onClick={resetGame}>Reset Game</Fab>}
        </div>
    );
};

export default Grid;