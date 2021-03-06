import './messageInput.css';

import AppContext from '../../AppContext';
import {useRef, useContext} from 'react';

function MessageInput(props) {
  const {submitAction} = props;
  
  const { workspace } = useContext(AppContext);
  const channels = workspace ? Object.values(workspace.channels).map(channel => { 
    return {...channel}
  }) : null;
  const messageTextField = useRef(null);
  const selectedChannel = useRef(null)

  const formSubmitted = event => {
    event.preventDefault();

    // Get message and channel
    // Return early if either is blank
    let message = messageTextField.current.value;
    let channel = selectedChannel.current.value
    if (!message) { return }

    // Handle action
    submitAction(message, channel);
    
    // Reset the textarea
    messageTextField.current.value = '';
  }

  return (
    <div className="message-sender">
        <form onSubmit={formSubmitted}>
            <textarea type="text" ref={messageTextField} />
            <div>
                <select defaultValue={channels ? channels[0].id : ''} ref={selectedChannel}>
                    {channels && channels.map((channel, i) =>
                    <option key={i} value={channel.id}>{channel.name}</option>
                    )}
                </select>
                <input type="submit" />
            </div>
        </form>
    </div>
    
  );
}

export default MessageInput;
