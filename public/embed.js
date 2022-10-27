let activeWidget = true;

const username = document.currentScript.getAttribute('data-username');

const button_color = document.currentScript.getAttribute('data-button-color') ?? '#f9e5d1';

const hide_sact_btn = document.currentScript.getAttribute('data-hide-bubble')
	? document.currentScript.getAttribute('data-hide-bubble')
	: false;

const hide_donate_text = document.currentScript.getAttribute('data-hide-donate-text')
	? document.currentScript.getAttribute('data-donate-text')
	: false;

const donate_text = document.currentScript.getAttribute('data-donate-text') ?? 'Donate via Crypto';

const icon = document.currentScript.getAttribute('data-icon')
	? `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${document.currentScript.getAttribute(
			'data-icon'
	  )}.svg`
	: 'https://sendacoin.to/assets/images/icon.svg';

const toggleSendACoinWidget = () => {
	const widget = document.getElementById('sendacoin_wiget');
	if (widget.style.display === 'none') {
		widget.style.display = 'block';
	} else {
		widget.style.display = 'none';
	}
};

const bubble_sact_button = !hide_sact_btn
	? `<a onClick="toggleSendACoinWidget()"
					style="display: flex;justify-content: center;align-items: center;tab-size: 4;font-family: inherit;line-height: inherit;box-sizing: border-box;border-width: 0;border-style: solid;border-color: #e5e7eb;--tw-shadow: 0 0 rgba(0,0,0,0);--tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgba(59, 130, 246, 0.5);--tw-ring-offset-shadow: 0 0 rgba(0,0,0,0);--tw-ring-shadow: 0 0 rgba(0,0,0,0);cursor: pointer;color: inherit;text-decoration: inherit;position: fixed;right: 1.25rem;bottom: 1.25rem;"
				>
        ${
			!hide_donate_text
				? `<div  style="font-family: 'Quicksand', sans-serif;
    font-weight: bold;padding: 10px;margin-right: 10px;z-index: 990;background: #ffffff;border-radius: .4rem;box-shadow: 0 0 transparent,0 0 transparent,0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);">
					${donate_text}
				</div>`
				: ''
		}
					<span style="tab-size: 4;font-family: inherit;line-height: inherit;cursor: pointer;color: inherit;box-sizing: border-box;border-width: 0;border-style: solid;border-color: #e5e7eb;--tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgba(59, 130, 246, 0.5);--tw-ring-offset-shadow: 0 0 rgba(0,0,0,0);--tw-ring-shadow: 0 0 rgba(0,0,0,0);--tw-bg-opacity: 1;background-color: #f9e5d1;border-radius: 9999px;display: inline-flex;align-items: center;justify-content: center;height: 3.5rem;--tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0,0,0,0)), var(--tw-ring-shadow, 0 0 rgba(0,0,0,0)), var(--tw-shadow);width: 3.5rem; background:${button_color};">
						<span className="text-xl font-medium leading-none text-white">
							<img src="${icon}" width="32px" height="32px" />
						</span>
					</span>
				</a>`
	: '';

document.body.innerHTML =
	document.body.innerHTML +
	`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
	<div id="sendacoin_wiget" style="position: fixed; display:none; bottom: 90px; right: 22px;z-index:999999;">
  <a onclick="toggleSendACoinWidget()" style="position: absolute;top: 20px; right: 17px;"><svg fill="none" viewBox="0 0 24 24" style="width:20px" stroke="currentColor" id="x" class="w-8 h-8 text-cool-gray-800 dark:text-cool-gray-200 group-hover:text-purple-600 group-focus:text-purple-600 dark:group-hover:text-purple-50 close-icon dark:group-focus:text-purple-50"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></a>
                        <iframe
                            frameborder="0"
                            className="shadow-lg rounded-md"
                            style="  animation: popup 0.7s;overflow: 'none';tab-size: 4;font-family: inherit;line-height: inherit;height: 560px;width: 450px;box-sizing: border-box;border-width: 0;border-style: solid;border-color: #e5e7eb;--tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgba(59, 130, 246, 0.5);--tw-ring-offset-shadow: 0 0 rgba(0,0,0,0);--tw-ring-shadow: 0 0 rgba(0,0,0,0);display: block;vertical-align: middle;border-radius: 0.375rem;--tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0,0,0,0)), var(--tw-ring-shadow, 0 0 rgba(0,0,0,0)), var(--tw-shadow);"
							src="https://sendacoin.to/${username}?hide_social=true&widget_mode=true&hide_redirect=true"
							height="560px"
							width="450px"
						></iframe>
      </div>${bubble_sact_button}
            <style>
			{
				font-family: 'Quicksand', sans-serif;
			}
            a{
              cursor:pointer;
            }
            .close-icon{
              color:#737373;
            }
            @keyframes popup {0%{opacity: 0; }  50%{
              opacity: 0.5;
            }
            60%{
              opacity: 0.6;
            }
            70%{
              opacity: 0.7;
            }
            80%{
              opacity: 0.8;
            }
            90%{
              opacity: 0.9;
            }
            100%{
              opacity: 1;
            }
}</style>
`;
