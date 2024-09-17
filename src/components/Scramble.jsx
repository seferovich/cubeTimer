

function Scramble ({scramble, getNewScramble}) {

    return(
        <div className="flex items-center justify-center mt-3 ">
            <h1 className="font-mono text-xl text-center font-bold text-[#212529] w-[98%]">{scramble[0].scramble_string}</h1>
        </div>
    )

}


export default Scramble