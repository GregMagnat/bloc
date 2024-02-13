/* eslint-disable react/prop-types */
import Markdown from 'marked-react';
import { Card, CardContent, Button } from '@mui/material';

const NoteDisplay = ({ markdown1, markdown2, handleEdit, handleDelete }) => {
    return (
        <Card style={{ width: '600px' }}>
            <CardContent>
                <div>
                    <div>
                        <Markdown>{markdown1}</Markdown>
                    </div>
                    <div>
                        <Markdown>{markdown2}</Markdown>
                    </div>
                </div>
                <div>
                    <Button onClick={handleEdit}>Éditer</Button>
                    <Button onClick={handleDelete}>Supprimer</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default NoteDisplay;
