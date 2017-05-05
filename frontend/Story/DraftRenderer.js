import React, { Component, PropTypes } from 'react';
import redraft from 'redraft';
import Spoiler from '../Editor/TextElements/Spoiler';
import Link from '../Editor/TextElements/Link';
import EmbededVideo from '../Editor/TextElements/EmbededVideo';
import QuoteBlock from '../Editor/TextElements/QuoteBlock/QuoteBlock';

//blockquote: (children) => <blockquote key={1}>{addBreaklines(children)}</blockquote>,

/* Style callbacks */
const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
  listItem: {
    float: 'none'
  }
};

// Adds a <br /> after a block.
const addBreaklines = (children) => children.map(child => [child, <br />]);

const renderers = {

  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    BOLD: (children) => <strong>{children}</strong>,
    ITALIC: (children) => <em>{children}</em>,
    UNDERLINE: (children) => <u>{children}</u>,
    CODE: (children) => <span style={styles.code}>{children}</span>,
  },

  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
     unstyled: (children) => children.map(child => <p>{child}</p>),
    'header-one': (children) => children.map(child => <h1>{child}</h1>),
    'header-two': (children) => children.map(child => <h2>{child}</h2>),
    'code-block': (children) => <pre style={styles.codeBlock}>{addBreaklines(children)}</pre>,
    'unordered-list-item': (children, depth) => <ul>{children.map(child => <li style={styles.listItem}>{child}</li>)}</ul>,
    'ordered-list-item': (children, depth) => <ol>{children.map(child => <li style={styles.listItem}>{child}</li>)}</ol>,
  },

  /* Entities receive children and the entity data */
  entities: {
    Image: (children, data) => <div><img src={data.src} /></div>,
	LINK: (children, data) =>  <a href={data.url} >{children}</a>,
	SPOILER: (children, data) => <Spoiler text={children[0]} />,
    Video: (children, data) => <div><EmbededVideo src={data.src} /></div>,
    QuoteBlock: (children, data) => <QuoteBlock comment={data.props} />
  },

}

export default class Renderer extends Component {

  static propTypes = { raw: PropTypes.object }

  renderWarning() {
    return <div>Nothing to render.</div>;
  }

  render() {

    const { raw } = this.props;

    if (!raw) {
      return this.renderWarning();
    }

    const rendered = redraft(raw, renderers);

    // redraft returns a null if there's nothing to render
    if (!rendered) {
      return this.renderWarning();
    }
    return (
      <div>
        {rendered}
      </div>
    );
  }
}
