import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class SvgTextElement extends React.PureComponent {
  render() {
    const {
      name,
      nodeStyle,
      textLayout,
      attributes,
      nodeData,
      unlabeledAttributes,
      copyableAttributes,
    } = this.props;
    return (
      <g>
        <text
          className={`nodeNameBase ${nodeData.nameLink ? ' nodeNameLink' : ''}`}
          style={nodeStyle.name}
          textAnchor={textLayout.textAnchor}
          x={textLayout.x}
          y={textLayout.y}
          transform={textLayout.transform}
          dy=".35em"
          onClick={event => {
            if (nodeData.nameLink) {
              window.location.href = nodeData.nameLink;
              event.stopPropagation();
            }
          }}
        >
          {name}
        </text>
        <text
          className="nodeAttributesBase"
          y={textLayout.y + 10}
          textAnchor={textLayout.textAnchor}
          transform={textLayout.transform}
          style={nodeStyle.attributes}
        >
          {attributes &&
            Object.keys(attributes).map(labelKey => (
              <tspan x={textLayout.x} dy="1.2em" key={uuid.v4()}>
                {unlabeledAttributes.indexOf(labelKey) < 0 ? `${labelKey}: ` : ''}
                {attributes[labelKey]}
                {copyableAttributes.indexOf(labelKey) >= 0 && (
                  <tspan>
                    &nbsp;&nbsp;
                    <CopyToClipboard text={attributes[labelKey]}>
                      <tspan className="copyLink" onClick={e => e.stopPropagation()}>
                        Copy
                      </tspan>
                    </CopyToClipboard>
                  </tspan>
                )}
              </tspan>
            ))}
        </text>
      </g>
    );
  }
}

SvgTextElement.defaultProps = {
  nodeData: undefined,
  attributes: undefined,
  unlabeledAttributes: [],
  copyableAttributes: [],
};

SvgTextElement.propTypes = {
  name: PropTypes.string.isRequired,
  nodeData: PropTypes.object,
  attributes: PropTypes.object,
  textLayout: PropTypes.object.isRequired,
  nodeStyle: PropTypes.object.isRequired,
  unlabeledAttributes: PropTypes.array,
  copyableAttributes: PropTypes.array,
};
