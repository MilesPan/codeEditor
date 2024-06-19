import {
  Building2,
  CheckCheck,
  Languages,
  Lightbulb,
  LockKeyhole,
  MessageCircleMore,
  Pickaxe,
  Star,
  Tag,
  ThumbsUp
} from 'lucide-react';
import './ProblemDescription.css';
import Questions from './Questions';
import Collapse from '../Collapse/Collapse';
import Avatar from '@/Layout/Header/Avatar';
import { memo } from 'react';
const ProblemDescription = memo(() => {
  console.log('problemDescription render')
  const tags = ['贪心', '数组', '双指针', '二分查找', '排序'];
  return (
    <>
      <div className="relative h-full">
        <div className="px-4 py-5 h-[calc(100%_-_2.5rem)] overflow-y-auto">
          <section className="flex justify-between items-center">
            <div className="flex text-2xl font-bold">
              <span>1953.</span>
              <span>你可以工作的最大周数</span>
            </div>
            <div className="flex gap-1 text-sm">
              <span className="text-[--text-gray]">已解答</span>
              <CheckCheck color="var(--logo_bg-green)" size={18}></CheckCheck>
            </div>
          </section>
          <section className="anchors flex gap-2 mt-2 mb-3">
            <div className="level anchorsWrapper text-[--plusFontColor]">中等</div>
            <div className="relatedTags anchorsWrapper">
              <Tag size={15}></Tag>相关标签
            </div>
            <div className="relatedEcs anchorsWrapper">
              <LockKeyhole size={15}></LockKeyhole>相关企业
            </div>
            <div className="prompt anchorsWrapper">
              <Lightbulb size={15}></Lightbulb>提示
            </div>
            <div className="i18n anchorsWrapper">
              <Languages size={15}></Languages>
            </div>
          </section>
          <section className="markdown break-words pb-10 bottom-boder">
            <span>MarkdownsMarkdownsMarkdownsMarkdownsMarkdownsMarkdownsMarkdownsMarkdownsMarkdowns</span>
          </section>
          <section className="questions mt-4 text-[#bdbfc2] pb-3 bottom-boder">
            <Questions></Questions>
          </section>
          <section className="py-3 bottom-boder">
            <Collapse TitleIcon={Tag} titleContent="相关标签">
              <div className="preset flex gap-2 mt-2">
                {tags.map(tag => (
                  <div className="questionTag" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
            </Collapse>
          </section>
          <section className="py-3 bottom-boder ">
            <Collapse TitleIcon={Building2} titleContent="相关企业"></Collapse>
          </section>
          <section className="py-3 bottom-boder">
            <Collapse TitleIcon={MessageCircleMore} titleContent="评论"></Collapse>
          </section>
          <section className="py-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Pickaxe size={16}></Pickaxe>
                <span className="text-sm">贡献者</span>
              </div>
              <Avatar></Avatar>
            </div>
          </section>
        </div>
        <div className="bottomOperators h-10 bottom-1 px-1 flex items-center gap-2 text-[--text-b1]">
          <div className="lick cursor-pointer py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 bg-[#f0f0f0] dark:bg-[#3c3c3c] hover:bg-[#e2e2e2] dark:hover:bg-[#505050]">
            <ThumbsUp size={14}></ThumbsUp>
            <span className="text-sm">144</span>
          </div>
          <div className="comments cursor-pointer py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 dark:hover:bg-[#3c3c3c] hover:bg-[#f0f0f0]">
            <MessageCircleMore size={14}></MessageCircleMore>
            <span className="text-sm">300</span>
          </div>
          <div className="line w-[1px] h-4 dark:bg-[#ffffff24] bg-[#ebebeb]"></div>
          <div className="favorite flex items-center">
            <Star size={18} fill="var(--star_color)" color=""></Star>
          </div>
          <div className="share"></div>
          <div className="help"></div>
        </div>
      </div>
    </>
  );
});

export default ProblemDescription;
