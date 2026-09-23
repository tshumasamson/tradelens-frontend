import { useState } from "react";
import { updateJournal } from "../../services/journalApi";

function TradeJournalForm({ trade }) {

    const [notes, setNotes] = useState(trade.notes || "");
    const [mistake, setMistake] = useState(trade.mistake || "");
    const [lessonLearned, setLessonLearned] = useState(
        trade.lesson_learned || ""
    );

    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const screenshotUrl =
        trade.screenshot
            ? trade.screenshot.startsWith("http")
                ? trade.screenshot
                : `http://127.0.0.1:8000${trade.screenshot}`
            : null;

    const saveJournal = async () => {

        try {

            setSaving(true);
            setSaved(false);

            const formData = new FormData();

            formData.append("notes", notes);
            formData.append("mistake", mistake);
            formData.append(
                "lesson_learned",
                lessonLearned
            );

            if (screenshot) {
                formData.append(
                    "screenshot",
                    screenshot
                );
            }

            await updateJournal(
                trade.position_id,
                formData
            );

            setSaved(true);

        } finally {

            setSaving(false);

        }
    };

    return (

        <div className="mt-8 pt-6 border-t border-slate-800">

            {/* Journal Header */}
            <div className="mb-5">

                <h3 className="text-base font-semibold text-white">
                    Trade Journal
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                    Record what happened, what went wrong, and what you learned.
                </p>

            </div>


            <div className="space-y-5">

                {/* Notes */}
                <div>

                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Notes
                    </label>

                    <textarea
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                        rows={4}
                        placeholder="Describe what happened during this trade..."
                        className="
                            w-full
                            bg-slate-950
                            border border-slate-800
                            text-slate-200
                            placeholder:text-slate-600
                            rounded-lg
                            px-3
                            py-3
                            text-sm
                            outline-none
                            resize-none
                            focus:border-slate-600
                            transition
                        "
                    />

                </div>


                {/* Mistake */}
                <div>

                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Mistake
                    </label>

                    <textarea
                        value={mistake}
                        onChange={(e) =>
                            setMistake(e.target.value)
                        }
                        rows={4}
                        placeholder="What could have been done better?"
                        className="
                            w-full
                            bg-slate-950
                            border border-slate-800
                            text-slate-200
                            placeholder:text-slate-600
                            rounded-lg
                            px-3
                            py-3
                            text-sm
                            outline-none
                            resize-none
                            focus:border-slate-600
                            transition
                        "
                    />

                </div>


                {/* Lesson Learned */}
                <div>

                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Lesson Learned
                    </label>

                    <textarea
                        value={lessonLearned}
                        onChange={(e) =>
                            setLessonLearned(e.target.value)
                        }
                        rows={4}
                        placeholder="What will you do differently next time?"
                        className="
                            w-full
                            bg-slate-950
                            border border-slate-800
                            text-slate-200
                            placeholder:text-slate-600
                            rounded-lg
                            px-3
                            py-3
                            text-sm
                            outline-none
                            resize-none
                            focus:border-slate-600
                            transition
                        "
                    />

                </div>


                {/* Screenshot */}
                <div>

                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Screenshot
                    </label>

                    <label
                        className="
                            flex
                            items-center
                            justify-center
                            w-full
                            h-24
                            border
                            border-dashed
                            border-slate-700
                            rounded-lg
                            bg-slate-950
                            hover:bg-slate-800/50
                            cursor-pointer
                            transition
                        "
                    >

                        <div className="text-center">

                            <p className="text-sm text-slate-400">
                                Choose a trade screenshot
                            </p>

                            <p className="text-xs text-slate-600 mt-1">
                                PNG, JPG or JPEG
                            </p>

                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {

                                const file =
                                    e.target.files[0];

                                if (!file) return;

                                setScreenshot(file);

                                setScreenshotPreview(
                                    URL.createObjectURL(file)
                                );

                            }}
                        />

                    </label>


                    {/* New Preview */}
                    {screenshotPreview && (

                        <div className="mt-3">

                            <p className="text-xs text-slate-500 mb-2">
                                New screenshot
                            </p>

                            <img
                                src={screenshotPreview}
                                alt="New trade screenshot"
                                className="
                                    w-full
                                    max-h-72
                                    object-contain
                                    rounded-lg
                                    border
                                    border-slate-800
                                "
                            />

                        </div>

                    )}


                    {/* Existing Screenshot */}
                    {!screenshotPreview && screenshotUrl && (

                        <div className="mt-3">

                            <p className="text-xs text-slate-500 mb-2">
                                Current screenshot
                            </p>

                            <img
                                src={screenshotUrl}
                                alt="Trade Screenshot"
                                className="
                                    w-full
                                    max-h-72
                                    object-contain
                                    rounded-lg
                                    border
                                    border-slate-800
                                "
                            />

                        </div>

                    )}

                </div>


                {/* Save */}
                <div className="flex items-center justify-between pt-2">

                    {saved ? (

                        <span className="text-sm text-green-400">
                            ● Journal saved
                        </span>

                    ) : (

                        <span className="text-xs text-slate-600">
                            Your journal helps track trading behavior.
                        </span>

                    )}


                    <button
                        onClick={saveJournal}
                        disabled={saving}
                        className="
                            bg-blue-600
                            hover:bg-blue-500
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            font-medium
                            transition
                        "
                    >
                        {saving
                            ? "Saving..."
                            : "Save Journal"}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default TradeJournalForm;