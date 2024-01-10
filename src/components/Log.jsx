// 85. 컴포넌트 간 상태(state) 공유
export default function Log({ turns }) {
    
    
    return (
        <ol id="log">
            {turns.map(turn => 
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row}, {turn.square.col}
                </li>)}
        </ol>
    );
}