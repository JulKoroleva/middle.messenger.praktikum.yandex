const Button = `
  {{#if buttonLink}}
    <a href="{{buttonLink}}" class="button {{buttonClass}}" data-page="{{buttonLink}}">
      {{#if buttonImage}}
        <img src="{{buttonImage}}" alt="{{imageAlt}}" class="{{buttonImageClass}}" />
      {{/if}}
      {{buttonText}}
    </a>
  {{else}}
    <button type="button" class="button {{buttonClass}}">
      {{#if buttonImage}}
        <img src="{{buttonImage}}" alt="{{imageAlt}}" class="{{buttonImageClass}}" />
      {{/if}}
      {{buttonText}}
    </button>
  {{/if}}
`;

export default Button;
