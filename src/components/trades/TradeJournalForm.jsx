import {useState} from "react";
import {updateJournal} from "../../services/journalApi";

function TradeJournalForm({trade}) {

    const [notes,setNotes] = useState(trade.notes || "");
    const [mistake,setMistake] = useState(trade.mistake || "");
    const [lessonLearned,setLessonLearned] = useState(trade.lesson_learned || "");
    const [screenshot,setScreenshot] = useState(null);
    const [screenshotPreview,setScreenshotPreview] = useState(null);


    const screenshotUrl =
        trade.screenshot
            ? trade.screenshot.startsWith(
                "http"
            )
                ? trade.screenshot
                : `http://127.0.0.1:8000${trade.screenshot}`
            : null;

    const saveJournal = async () => {
        const formData = new FormData();
        formData.append( "notes",notes);
        formData.append("mistake",mistake);
        formData.append("lesson_learned",lessonLearned);

        if (screenshot) {
            formData.append("screenshot",screenshot);
        }

        await updateJournal(trade.position_id,formData);
        alert("Journal Saved");
    };
    
    return (

        <div
            className="
            mt-8
            border-t
            border-slate-800
            pt-6
            "
        >

            <h3
                className="
                text-xl
                font-semibold
                text-white
                mb-4
                "
            >
                Trade Journal
            </h3>

            <div
                className="
                space-y-4
                "
            >

                <div>

                    <label
                        className="
                        block
                        text-slate-400
                        mb-2
                        "
                    >
                        Notes
                    </label>

                    <textarea

                        value={notes}

                        onChange={(e) =>
                            setNotes(
                                e.target.value
                            )
                        }

                        rows={4}

                        className="
                        w-full
                        bg-slate-800
                        text-white
                        rounded-lg
                        p-3
                        "
                    />

                </div>

                <div>

                    <label
                        className="
                        block
                        text-slate-400
                        mb-2
                        "
                    >
                        Mistake
                    </label>

                    <textarea

                        value={mistake}

                        onChange={(e) =>
                            setMistake(
                                e.target.value
                            )
                        }

                        rows={4}

                        className="
                        w-full
                        bg-slate-800
                        text-white
                        rounded-lg
                        p-3
                        "
                    />

                </div>

                <div>

                    <label
                        className="
                        block
                        text-slate-400
                        mb-2
                        "
                    >
                        Lesson Learned
                    </label>

                    <textarea

                        value={lessonLearned}

                        onChange={(e) =>
                            setLessonLearned(
                                e.target.value
                            )
                        }

                        rows={4}

                        className="
                        w-full
                        bg-slate-800
                        text-white
                        rounded-lg
                        p-3
                        "
                    />

                </div>

                <div>

                    <label
                        className="
                        block
                        text-slate-400
                        mb-2
                        "
                    >
                        Screenshot
                    </label>

                    <input

                        type="file"

                        accept="image/*"
                        onChange={(e) => {

                            const file =
                                e.target.files[0];

                            setScreenshot(file);

                            setScreenshotPreview(

                                URL.createObjectURL(
                                    file
                                )

                            );

                        }}

                        className="
                        text-white
                        "
                    />

                    {

                        screenshotUrl && (

                            <div
                                className="
                                mt-4
                                "
                            >

                                <p
                                    className="
                                    text-slate-400
                                    mb-2
                                    "
                                >
                                    Current Screenshot
                                </p>

                                <img

                                    src={screenshotUrl}

                                    alt="Trade Screenshot"

                                    className="
                                    w-full
                                    max-w-2xl
                                    rounded-lg
                                    border
                                    border-slate-700
                                    "

                                />

                            </div>

                        )

                    }

                    <button
                        onClick={saveJournal}

                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        "
                    >
                        Save Journal
                    </button>
                </div>
            </div>
        </div>
    );

}

export default TradeJournalForm;