interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="flex-grow p-4">
            {children}
        </main>
    );
}

export default Main;

