import { RadioGroup } from '@headlessui/react';

interface IProps {
  value?: string;
  content: Array<string>;
  onChange: React.Dispatch<React.SetStateAction<unknown>>;
}

const CheckIcon = (props: { className: string }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.25" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

function RadioGroupDark(props: IProps) {
  return (
    <RadioGroup
      value={props.value}
      className="custom-webkit-focus mx-auto flex w-full max-w-[300px]"
      onChange={props.onChange}
    >
      <RadioGroup.Label className="custom-webkit-focus sr-only flex w-full">
        Radio Group Dark
      </RadioGroup.Label>
      <div className="custom-webkit-focus mx-auto flex w-full space-x-2">
        {props.content.map((content, i) => (
          <RadioGroup.Option
            key={i}
            value={content}
            className={({ active, checked }) =>
              `${active ? 'ring-0 ring-offset-0' : ''}
                ${
                  checked
                    ? 'bg-[#0f0f0f] text-white'
                    : 'bg-[#191919] text-white transition-colors hover:bg-[#101010]'
                }
                  custom-webkit-focus relative flex w-full cursor-default rounded-lg border border-solid border-white/10 px-3 py-2.5 outline-none`
            }
          >
            {({ checked }) => (
              <>
                <div className="custom-webkit-focus flex w-full items-center justify-between">
                  <div className="flex w-full items-center">
                    <div className="w-full text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`text-center text-sm font-normal ${
                          checked ? 'text-white' : 'text-[#ffffffb3]'
                        }`}
                      >
                        {content}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  {checked && (
                    <div className="custom-webkit-focus flex-shrink-0 pl-2 text-white">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default RadioGroupDark;
