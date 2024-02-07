import React, { useState, useEffect } from 'react';
import Markdown from 'marked-react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function MarkdownInput() {
    const [markdown1, setMarkdown1] = useState('Titre');
    const [markdown2, setMarkdown2] = useState('Note');
    const [savedItems, setSavedItems] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    useEffect(() => {
        const savedMarkdowns = localStorage.getItem('savedMarkdowns');
        if (savedMarkdowns) {
            setSavedItems(JSON.parse(savedMarkdowns));
        }
    }, []);

    const handleSave = () => {
        const newItem = { markdown1, markdown2 };
        const newSavedItems = [...savedItems, newItem];
        setSavedItems(newSavedItems);
        localStorage.setItem('savedMarkdowns', JSON.stringify(newSavedItems));
        setMarkdown1('');
        setMarkdown2('');
    };

    const handleEdit = () => {
        if (selectedCardIndex !== null) {
            const selectedCard = savedItems[selectedCardIndex];
            setMarkdown1(selectedCard.markdown1);
            setMarkdown2(selectedCard.markdown2);
        }
    };

    const handleDelete = () => {
        if (selectedCardIndex !== null) {
            const updatedSavedItems = savedItems.filter((item, index) => index !== selectedCardIndex);
            setSavedItems(updatedSavedItems);
            localStorage.setItem('savedMarkdowns', JSON.stringify(updatedSavedItems));
            setSelectedCardIndex(null);
        }
    };

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };

    const handleNewNote = () => {
        setSelectedCardIndex(null);
        setMarkdown1('Titre');
        setMarkdown2('Note');
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '50px' }}>
                <Button onClick={handleNewNote} style={{ marginBottom: '10px' }}>Nouvelle Note</Button>
                {savedItems.map((item, index) => (
                    <Card key={index} style={{ marginBottom: '10px', width: '400px', cursor: 'pointer' }} onClick={() => handleCardClick(index)}>
                        <CardContent>
                            <div>
                                <Markdown>{item.markdown1}</Markdown>
                                <div>
                                    <Markdown>{item.markdown2}</Markdown>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {selectedCardIndex !== null ? (
                    <Card style={{ width: '600px' }}>
                        <CardContent>
                            <div>
                                <div>
                                    <Markdown>{savedItems[selectedCardIndex].markdown1}</Markdown>
                                </div>
                                <div>
                                    <Markdown>{savedItems[selectedCardIndex].markdown2}</Markdown>
                                </div>
                            </div>
                            <div>
                                <Button onClick={handleEdit}>Éditer</Button>
                                <Button onClick={handleDelete}>Supprimer</Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div>
                            <Markdown>{markdown1}</Markdown>
                        </div>
                        <div>
                            <Markdown>{markdown2}</Markdown>
                        </div>
                        <div>
                            <textarea value={markdown1} onChange={(event) => setMarkdown1(event.target.value)} />
                        </div>
                        <div>
                            <textarea value={markdown2} onChange={(event) => setMarkdown2(event.target.value)} />
                        </div>
                        <div>
                            <Button onClick={handleSave}>Sauvegarder</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}