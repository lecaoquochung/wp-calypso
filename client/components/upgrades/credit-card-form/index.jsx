/**
 * External dependencies
 */
import extend from 'lodash/object/assign';
import React from 'react';

/**
 * Internal dependencies
 */
import CountrySelect from 'my-sites/upgrades/components/form/country-select';
import CreditCardNumberInput from 'components/upgrades/credit-card-number-input';
import Input from 'my-sites/upgrades/components/form/input';
import { maskField, unmaskField } from 'lib/credit-card-details';

const CreditCardForm = React.createClass( {
	propTypes: {
		card: React.PropTypes.object.isRequired,
		countriesList: React.PropTypes.object.isRequired,
		eventFormName: React.PropTypes.string.isRequired,
		isFieldInvalid: React.PropTypes.func.isRequired,
		onFieldChange: React.PropTypes.func.isRequired
	},

	field: function( fieldName, componentClass, props ) {
		return React.createElement( componentClass, extend( {}, props, {
			additionalClasses: 'credit-card-form__field',
			eventFormName: this.props.eventFormName,
			invalid: this.props.isFieldInvalid( fieldName ),
			name: fieldName,
			onBlur: this.handleFieldChange,
			onChange: this.handleFieldChange,
			value: this.getFieldValue( fieldName )
		} ) );
	},

	getFieldValue: function( fieldName ) {
		return this.props.card[ fieldName ];
	},

	handleFieldChange: function( event ) {
		const { name: fieldName, value: nextValue} = event.target;

		const previousValue = this.getFieldValue( fieldName );

		const rawDetails = {
			[ fieldName ]: unmaskField( fieldName, previousValue, nextValue )
		};

		const maskedDetails = {
			[ fieldName ]: maskField( fieldName, previousValue, nextValue )
		};

		this.props.onFieldChange( rawDetails, maskedDetails );
	},

	render: function() {
		return (
			<div className="credit-card-form">
				{ this.field( 'name', Input, {
					labelClass: 'credit-card-form__label',
					autofocus: true,
					label: this.translate( 'Name on Card', {
						context: 'Card holder name label on credit card form'
					} )
				} ) }

				{ this.field( 'number', CreditCardNumberInput, {
					inputMode: 'numeric',
					labelClass: 'credit-card-form__label',
					label: this.translate( 'Card Number', {
						context: 'Card number label on credit card form'
					} )
				} ) }

				<div className="credit-card-form__extras">
					{ this.field( 'expiration-date', Input, {
						inputMode: 'numeric',
						labelClass: 'credit-card-form__label',
						label: this.translate( 'MM/YY', {
							context: 'Expiry label on credit card form'
						} )
					} ) }

					{ this.field( 'cvv', Input, {
						inputMode: 'numeric',
						labelClass: 'credit-card-form__label',
						label: this.translate( 'CVV', {
							context: '3 digit security number on credit card form'
						} )
					} ) }

					{ this.field( 'country', CountrySelect, {
						label: this.translate( 'Country' ),
						countriesList: this.props.countriesList
					} ) }

					{ this.field( 'postal-code', Input, {
						labelClass: 'credit-card-form__label',
						label: this.translate( 'Postal Code', {
							context: 'Postal code on credit card form'
						} )
					} ) }
				</div>
			</div>
		);
	}
} );

export default CreditCardForm;
