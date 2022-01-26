import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component{

    state = {videos: [], selectedVideo: null};

    componentDidMount(){
        this.onTermSubmit('sandra afrika');
    }

    onTermSubmit = async (term) => {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search',{
            params: {
                part: 'snippet',
                maxResult: 5,
                q: term,
                key: 'AIzaSyB8yEcgCTRvH6KO9Mn34NF0l6Xp8wUTVuM'
            }
        });

        this.setState({videos: response.data.items,selectedVideo: response.data.items[0]});
    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});
    }

    render(){
        return(
            <div className="ui container">
                <SearchBar onFormSubmit = {this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;