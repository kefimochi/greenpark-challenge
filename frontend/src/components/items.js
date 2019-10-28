import React from 'react';
import { connect } from 'react-redux';
import { deriveSectionImage } from '../helpers/deriving';

const Items = props => {
  return (
    <div className="sections-main">
      {props.items.length > 0 && props.sections.length > 0 ? (
        props.sections
          .find(sect => sect['_id'] === props.sectionId)
          .options.map(opt =>
            props.items.map(item => {
              if (item['_id'] === opt['_ref']) {
                console.log(item);
                return (
                  <li className="main-item">
                    <img
                      src={`/images/${deriveSectionImage(
                        item.image.asset['_ref']
                      )}`}
                      alt={`Image of ${item.name.en}`}
                    />
                    <h3>{item.name.en}</h3>
                  </li>
                );
              }
            })
          )
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items,
    sections: state.sections
  };
};

export default connect(
  mapStateToProps,
  {}
)(Items);
