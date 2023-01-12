import React, {useState, useRef, useEffect} from 'react';

function Buttons({ addcount, count }) {

    const [cheer, setCheer] = useState('');
    const [style, setStyle] = useState({left: `0px`, top: `0px`});
    const runBtn = useRef()

    useEffect(() => {
        let random = Math.floor(Math.random() * 900) + 'px';
    }, [handleClick]);
    
    function handleClick(e) {
        if (e.target.id === 'yes') {
            addcount();
            if (count === 2) { setCheer('Куда?'); }
            if (count === 3.5) {
                setCheer('Пока!');
                setStyle({left: `${useEffect}px`, top: `${useEffect}px`})
                runBtn.current.style = style;
            }

        } else {
            setCheer('Молодец!')
        }
    }

    return <div className='centerall'>
        <p>Выпить ещё?</p>
        <div className='buttons'>
        <button id='yes' onClick={handleClick} ref={runBtn} className='yesBtn'>Да</button>
        <button id='no' onClick={handleClick} className='noBtn'>Нет</button>
        </div>
        <p>{cheer}</p>
    </div>
}

export default Buttons;