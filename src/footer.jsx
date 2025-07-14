export const Footer = () => {
    const d = new Date().getFullYear()
    return (
        <footer className="footer">
            © {d} Diri developement. All rights reserved.
        </footer>
    )
}