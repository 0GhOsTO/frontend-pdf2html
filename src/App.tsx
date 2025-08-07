import React, { useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const App: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    //for loading screen
    const [jobId, setJobId] = useState<string | null>(null);
    const [pollingInterval, setPollingInterval] = useState<number | null>(null);

    //handling the submit button
    const handleSubmit = async () => {
        if (!selectedFile) return;
        setLoading(true);
        setHtmlContent(null);
        setJobId(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch("https://backend-pdf2html.onrender.com/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!data.job_id) throw new Error("No job ID returned");
            setJobId(data.job_id);

            // Poll for result every 2s
            const interval = setInterval(async () => {
                const res2 = await fetch(`https://backend-pdf2html.onrender.com/result/${data.job_id}`);
                const resultData = await res2.json();
                if (resultData.status === "done") {
                    setHtmlContent(resultData.html);
                    setLoading(false);
                    setJobId(null);
                    clearInterval(interval);
                    setPollingInterval(null);
                }
            }, 2000);
            setPollingInterval(interval);

        } catch (err: unknown) {
            setLoading(false);
            setJobId(null);
            if (pollingInterval) clearInterval(pollingInterval);
            if (err instanceof DOMException && err.name === "AbortError") {
                console.log("Stopped by the user")
            } else if (err instanceof Error) {
                alert("Error: " + err.message);
            } else {
                alert("Error: " + String(err));
            }
        }
    };

    //handling the stopping cancelling the fetching after the call.
    const handleStop = async () => {
        if (pollingInterval) clearInterval(pollingInterval);
        setPollingInterval(null);
        setLoading(false);

        if (jobId) {
            await fetch(`https://backend-pdf2html.onrender.com/cancel/${jobId}`, { method: "POST" });
        }
    };

    //handling the dropping.
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        //just in case other buttons are also called. Blocking the issue of it.
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    //handling the draging on the top
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };


    //handling the drag and leave
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleBoxClick = () => {
        //click the box and turn on the file
        inputRef.current?.click();
    };

    return (
        <Box>
            {loading && (
                // Loading Screen
                <Box
                    sx={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(255,255,255,0.8)",
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h3">Processing your PDF...</Typography>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={handleStop}
                    >
                        Stop
                    </Button>
                </Box>
            )}
            <Typography
                variant="h1"
                align="center"
                sx={{
                    mt: "10vh" }}>
                PDF to HTML
            </Typography>
            <Typography
                variant="h6"
                align="center"
                sx={{
                    mt: "3vh" }}>
                email cho.yoonho023@gmail.com to use
            </Typography>
            <Box
                id="dragContainer"
                sx={{
                    width: "70vw",
                    height: 200,
                    border: "5px dashed rgba(97,97,97,0.5)",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: dragActive ? "#e3f2fd80" : "#fafafa80",
                    cursor: "pointer",
                    m: "auto",
                    mt: "10vh"
                }}
                onClick={handleBoxClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    onChange={handleFileChange}
                />
                <Typography variant="h6" color="primary" gutterBottom>
                    Drag & Drop a file here, or
                </Typography>
                <Button variant="contained" onClick={handleBoxClick}>
                    Select File
                </Button>
                {selectedFile && (
                    <>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1.3rem",
                                    md: "1.6rem",
                                    lg: "1.9rem",
                                    xl: "2.0rem",
                                },
                                mt: 2,
                                align:"center"
                        }}>
                            Selected file: <strong>{selectedFile.name}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2 }}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleSubmit()
                            }}
                        >
                            Submit
                        </Button>
                    </>
                )}
            </Box>
            {htmlContent && (
                <Box sx={{
                    width: "90vw",
                    minHeight: "60vh",
                    maxHeight: "80vh",
                    overflow: "auto",
                    bgcolor: "#fff",
                    m: "auto",
                    mt: 4,
                    borderRadius: 2,
                    p: 3,
                    boxShadow: 3
                }}>
                    <Typography variant="h6" color="secondary">
                        Raw HTML Output
                    </Typography>
                    <Box sx={{
                        bgcolor: "#222",
                        color: "#eee",
                        p: 2,
                        borderRadius: 2,
                        overflow: "auto",
                        fontFamily: "monospace",
                        fontSize: 16,
                        maxHeight: "65vh"
                    }}>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                {htmlContent}
            </pre>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default App;

