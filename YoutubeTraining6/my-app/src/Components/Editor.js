import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ currentNote, updateNote }) {
    // Maintaining it own state to update the "write" or "preview" tab
    const [selectedTab, setSelectedTab] = React.useState("write")
    
    // Converts markdown to html package
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className="pane editor">
            {/* ReactMde package */}
            <ReactMde
                value={currentNote.body}

                // Contains built in onChange selectedTab event handler and 
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
