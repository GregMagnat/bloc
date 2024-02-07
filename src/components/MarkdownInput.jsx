import React, { useState, useEffect } from 'react';
import Markdown from 'marked-react';
import { Button, Card, CardContent } from '@mui/material';

const MarkdownInput = () => {
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
        updateSavedItems(newSavedItems);
        resetForm();
    };

    const updateSavedItems = (newSavedItems) => {
        setSavedItems(newSavedItems);
        localStorage.setItem('savedMarkdowns', JSON.stringify(newSavedItems));
    };

    const resetForm = () => {
        setMarkdown1('Titre');
        setMarkdown2('Note');
    };

    const handleCardEdit = (index) => {
        setSelectedCardIndex(index);
        const selectedCard = savedItems[index];
        setMarkdown1(selectedCard.markdown1);
        setMarkdown2(selectedCard.markdown2);
        handleDelete();
    };

    const handleDelete = () => {
        if (selectedCardIndex !== null) {
            const updatedSavedItems = savedItems.filter((item, index) => index !== selectedCardIndex);
            updateSavedItems(updatedSavedItems);
            setSelectedCardIndex(null);
        }
    };

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };

    const handleNewNote = () => {
        setSelectedCardIndex(null);
        resetForm(); // Réinitialise les valeurs du titre et de la note
    };

    const renderSavedItems = () => {
        return savedItems.map((item, index) => (
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
        ));
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '50px' }}>
                <Button onClick={handleNewNote} style={{ marginBottom: '10px' }}>Nouvelle Note</Button>
                {renderSavedItems()}
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
                                <Button onClick={() => handleCardEdit(selectedCardIndex)}>Éditer</Button>
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
};

export default MarkdownInput;
