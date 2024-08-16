interface ErrorModalProps {
    title: string;
    message: string;
    onClose: () => void;
    onAccept?: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, message, onClose, onAccept }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                <h2 className="font-bold text-black">{title}</h2>
                <p className="text-black">{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="btn btn-error text-white"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    {onAccept && (
                        <button
                            className="btn btn-success text-white ml-4"
                            onClick={onAccept}
                        >
                            Accept
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;