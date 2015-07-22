"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var classSet = _interopRequire(require("classnames"));

var Const = _interopRequire(require("./Const"));

var TableHeaderColumn = (function (_React$Component) {
  function TableHeaderColumn() {
    _classCallCheck(this, TableHeaderColumn);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(TableHeaderColumn, _React$Component);

  _createClass(TableHeaderColumn, {
    handleColumnClick: {
      value: function handleColumnClick(e) {
        if (!this.props.dataSort) {
          return;
        }this.order = this.order == Const.SORT_DESC ? Const.SORT_ASC : Const.SORT_DESC;
        this.props.clearSortCaret(this.order, this.props.dataField);
        this.refs.innerDiv.getDOMNode().appendChild(this.renderSortCaret());
      }
    },
    render: {
      value: function render() {
        var thStyle = {
          textAlign: this.props.dataAlign
        };

        var classes = classSet(this.props.dataSort ? "sort-column" : "");

        return React.createElement(
          "th",
          { className: classes, style: thStyle },
          React.createElement(
            "div",
            { ref: "innerDiv", className: "th-inner table-header-column",
              onClick: this.handleColumnClick.bind(this) },
            this.props.children
          )
        );
      }
    },
    renderSortCaret: {
      value: function renderSortCaret() {
        var wrap = document.createElement("span");
        wrap.className = "order";
        if (this.order == Const.SORT_ASC) wrap.className += " dropup";
        var inner = document.createElement("span");
        inner.className = "caret";
        inner.style.margin = "10px 5px";
        wrap.appendChild(inner);
        return wrap;
      }
    }
  });

  return TableHeaderColumn;
})(React.Component);

TableHeaderColumn.propTypes = {
  dataField: React.PropTypes.string,
  dataAlign: React.PropTypes.string,
  dataSort: React.PropTypes.bool,
  clearSortCaret: React.PropTypes.func,
  dataFormat: React.PropTypes.func,
  isKey: React.PropTypes.bool,
  editable: React.PropTypes.bool
};

TableHeaderColumn.defaultProps = {
  dataAlign: "left",
  dataSort: false,
  dataFormat: undefined,
  isKey: false,
  editable: true,
  clearSortCaret: undefined
};

module.exports = TableHeaderColumn;