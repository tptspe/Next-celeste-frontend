import React from "react";
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/umd/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/umd/parse'; 

const names = [
    'Brian',
    'Caley',
    'Casey',
    'Caroline',
    'Chris',
    'David',
    'Misha',
    'Wichita, KS',
    'Wanda Massey',
    'Wedding',
    'Westchester, NY',
    'William Rupert'
  ];

  const people = [
    {
        name: "C#",
        city: "KS",
        type: "location"
      },
    {
      name: "Wichita",
      city: "KS",
      type: "location"
    },
    {
      name: "Wanda Massey",
      city: "",
      type: "person"
    },
    {
      name: "Wedding",
      city: "",
      type: "wedding"
    },
    {
      name: "Westchester",
      city: "NY",
      type: "location"
    },
    {
      name: "William Rupert",
      city: "",
      type: "person"
    }
  ];


  
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
//   const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  const renderInputComponent = inputProps => (
    <div className="inputContainer">
      {/* <img className="icon" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-128.png" /> */}
      <span className="icon fa fa-search form-control-feedback"></span>
      <input {...inputProps} />
    </div>
  );

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('\\b' + escapedValue, 'i');
    
    return people.filter(person => regex.test(getSuggestionValue(person)));
  }
  
  function getSuggestionValue(suggestion) {
    return `${suggestion.name} ${suggestion.city}`;
  }

  function AutosuggestionIcon(type){
      var icon = 'fas fa-map-marker-alt';
      if (type == "wedding")
       icon = "fas fa-star";
       if (type == "wedding")
       icon = "fas fa-user-circle";

       return icon;
  }
  
  function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.name} ${suggestion.city}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    const icon = AutosuggestionIcon(suggestion.type);
    return (
    //   <span className={'suggestion-content ' + suggestion.type}>
    <span className={'suggestion-content'}>
        <i className={icon}></i>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
  
              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  }
  
  export default class AutoSearch extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: []
      };    
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "artists near Brooklyn, NY",
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={inputProps} />
      );
    }
  }
//   ReactDOM.render(<App />, document.getElementById('app'));
  