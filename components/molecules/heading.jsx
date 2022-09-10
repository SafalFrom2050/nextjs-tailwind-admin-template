import React from "react";
import PrimaryButton from "../atoms/buttons/primaryButton";

function Heading({title = "Dashboard", hideActions = true, actionText = "Save", onActionClick, actionLoading = false}) {

    return (
        <div>
            <div className="relative py-6 lg:py-8">
                <img className="z-0 w-full h-full absolute inset-0 object-cover"
                     src="/blur-green.webp" alt="bg"/>
                <div
                    className="z-10 relative container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h4 className="text-2xl font-bold leading-tight text-white">{title}</h4>

                    </div>
                    {!hideActions &&
                        <div className="my-auto">
                            <PrimaryButton
                                disabled={actionLoading}
                                onClick={onActionClick}
                                name={actionText}
                                bClass={"px-8 my-0"}
                            />
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Heading;
