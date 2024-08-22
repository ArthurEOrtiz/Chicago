interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="flex-grow flex justify-center p-4">
            {children}
        </main>
    );
}

export default Main;

